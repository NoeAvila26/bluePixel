import * as types from './types';

export const addUpload = upload => ({ type: types.ADD_UPLOAD, payload: { upload } });

export const removeUpload = upload => ({ type: types.REMOVE_UPLOAD, payload: { upload } });

export const updateUpload = upload => ({ type: types.UPDATE_UPLOAD, payload: { upload } });

export const filterUpload = filter => ({ type: types.FILTER_UPLOAD, payload: { filter } });

export const showState = state => ({ type: types.SHOW_STATE, payload: { state } });