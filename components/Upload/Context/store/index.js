import React, {useContext, Component} from 'react';
import reducer from '../reducers';
import initialState from "./initialState";
import BaseFileContext from './context';
import cryptoRandomString from 'crypto-random-string';
import {signUpload, verifyUpload} from '../../queries.graphql';
import {ADD_UPLOAD, UPDATE_UPLOAD} from "../actions/types";

export const useStore = () => useContext(BaseFileContext);

export class Provider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.dispatch = this.dispatch.bind(this);
        this.nextUpload = this.nextUpload.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }

    dispatch = (action, callback = null) => {
        const newState = reducer(this.state, action);
        this.setState({
            ...this.state,
            ...newState
        }, callback);
    };

    nextUpload = () => {
        const currentlyUploading = this.state.uploads.reduce((count, file) => file.uploading ? count + 1 : count, 0);
        if (currentlyUploading >= 2) return;
        const nextFile = this.state.uploads.find(file => !file.uploading && !file.done);
        if (!nextFile) return;
        const req = new XMLHttpRequest();
        const fields = JSON.parse(nextFile.policy.fields),
            formData = new FormData();
        Object.keys(fields).map(key => formData.append(key, fields[key]));
        formData.append('acl', 'public-read');
        formData.append('file', nextFile.file);
        req.open('POST', nextFile.policy.url);
        req.upload.onprogress = event => {
            const uploadProgress = event.lengthComputable ? (event.loaded / event.total) * 100 : -1;
            const upload = this.state.uploads.find(upload => upload.id === nextFile.id);
            this.dispatch({type: UPDATE_UPLOAD, payload: {upload: {...upload, uploadProgress}}})
        };
        req.onerror = (event) => {
            console.error(event);
            const upload = this.state.uploads.find(upload => upload.id === nextFile.id);
            this.dispatch({
                type: UPDATE_UPLOAD,
                payload: {upload: {...upload, uploading: false, done: true, error: new Error('Error al cargar')}}
            }, () => {
                setTimeout(() => {
                    this.nextUpload();
                }, 5000);
            });
        };
        req.onload = () => {
            const upload = this.state.uploads.find(upload => upload.id === nextFile.id);
            this.dispatch({
                type: UPDATE_UPLOAD,
                payload: {upload: {...upload, uploading: false, done: true, req: null, uploadProgress: 100}}
            }, async () => {
                try {
                    await this.props.client.mutate({
                        mutation: verifyUpload,
                        variables: {id: nextFile.id}
                    })
                } catch (error) {
                    const upload = this.state.uploads.find(upload => upload.id === nextFile.id);
                    this.dispatch({type: UPDATE_UPLOAD, payload: {...upload, error}});
                }
                this.nextUpload();
            });
        };
        req.send(formData);
        this.dispatch({type: UPDATE_UPLOAD, payload: {upload: {...nextFile, uploading: true, req}}}, this.nextUpload);
    };

    uploadFiles = async (files, path) => {
        let result = [];
        await Promise.all(Array.from(files).map(async (file) => {
            try {
                const response = await this.props.client.mutate({
                    mutation: signUpload,
                    variables: {name: file.name, path}
                });
                const data = response.data.signUpload,
                    upload = {
                        ...data.file, policy: data.policy, file,
                        req: null, uploadProgress: 0, uploading: false, done: false
                    };
                result.push(upload);
                this.dispatch({type: ADD_UPLOAD, payload: {upload}});
            } catch (error) {
                const upload = {id: cryptoRandomString({type: 'url-safe', length: 10}), name: file.name, error};
                result.push(upload);
                this.dispatch({type: ADD_UPLOAD, payload: {upload}});
            }
        }));
        this.nextUpload();
        return result;
    };

    render() {
        return <BaseFileContext.Provider
            value={[{
                ...this.state,
                uploadFiles: this.uploadFiles
            }, this.dispatch]}
            children={this.props.children}/>
    }
}
