import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {useDropzone} from 'react-dropzone'
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Upload from "../Upload";


const useStyles = makeStyles(theme => ({
    fileUpload: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        paddingRight: '12px',
        paddingBottom: '72px',
        display: 'flex',
        flexDirection: 'column'
    },
    prompt: {
        fontWeight: 'bold !important',
        fontSize: '18px !important',
        marginTop: '12px',
        marginBottom: '12px'
    },
    fileWrapper: {
        margin: '1px',
        cursor: 'pointer',
        width: '100%',
        flexGrow: 1,
        backgroundColor: '#f2f2f2',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '16px',
        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'none !important'
        }
    },
    preview: {
        width: '100%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px',
        backgroundColor: '#000',
        [theme.breakpoints.up('md')]: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px) grayscale(0.5)',
        }
    },
    chipWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        transition: 'background-color 500ms'
    },
    chip: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
        cursor: 'pointer'
    }
}));

const FileUploadForm = ({userFileUpload, onAnswer, ...props}) => {
    const [{uploadFiles, uploads}] = useContext(Upload.Context),
        classes = useStyles(),
        [file, setFile] = useState(null),
        [imageSrc, setImageSrc] = useState(null),
        fileUpload = userFileUpload.fileUpload;

    const currentUpload = file ? uploads.filter(upload => upload.id === file.id).reduce((prev, x) => x, null) : null,
        loading = currentUpload ? currentUpload.uploading : false;

    useEffect(() => {
        if(!currentUpload) return;
        if(currentUpload.uploadProgress === 100 && !currentUpload.uploading && file) {
            onAnswer(userFileUpload.id, file.id);
        }
    }, [currentUpload]);

    const onDrop = useCallback(async (acceptedFiles) => {
            let fr = new FileReader();
            fr.onload = () => {
                setImageSrc(fr.result);
            };
            fr.readAsDataURL(acceptedFiles[0]);
            const result = await uploadFiles(acceptedFiles, `/`);
            if (result.length !== 1) return;
            setFile(result[0]);
        }, [setImageSrc, setFile]),
        {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return <Box className={classes.fileUpload} {...props}>
        <Typography className={classes.prompt}>{fileUpload.prompt}</Typography>
        <Box {...getRootProps({
            className: classes.fileWrapper,
            style: {
                backgroundPosition: 'center center',
                backgroundImage: imageSrc ? `url('${imageSrc}')` : 'none'
            }
        })}>
            <input {...getInputProps({
                style: {
                    display: 'none'
                },
                accept: 'image/*'
            })}/>
            <Box className={classes.preview} style={{
                backgroundImage: imageSrc ? `url('${imageSrc}')` : 'none'
            }}>
                <Box className={classes.chipWrapper} style={{
                    backgroundColor: (loading || isDragActive) ? '#FF971699' : '#FF971600'
                }}>
                    {
                        (!loading) && <Chip className={classes.chip}
                                          label={!isDragActive ? (file ? "Seleccionar otra imagen" : "Seleccione o arrastre imagen") : "Suelte la imagen"}/>
                    }
                    {
                        loading && <CircularProgress value={currentUpload.uploadProgress} variant={"determinate"}
                                                     style={{color: '#fff'}}/>
                    }
                </Box>
            </Box>
        </Box>
    </Box>
};

export default FileUploadForm
