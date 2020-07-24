import React, {Fragment, useContext, useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import PreviewContext from "./PreviewContext";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import baseConfig from "../../base.config";
import {motion} from "framer-motion";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";


const useStyles = makeStyles(theme => ({
    root: {
        background: '#000'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: '#fff',
    },
}));

const ImagePreview = ({file}) => {
    const supportsFilter = typeof CSS !== 'undefined' ? CSS.supports('filter', 'blur(12px)') : false;
    return <div style={{position: 'absolute', height: '100%', width: '100%'}}>
        {
            supportsFilter &&
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5,
                backgroundImage: `url(${baseConfig.previewRoot}/${file.id}/640)`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                filter: 'blur(12px)'
            }}/>
        }
        <PinchZoomPan position='center' zoomButtons={false} maxScale={2}>
            <img alt={`Archivo ${file.id}`} src={`${baseConfig.previewRoot}/${file.id}/2160`}/>
        </PinchZoomPan>
    </div>;
}

const PreviewDialog = ({...props}) => {
    const classes = useStyles(),
        {preview, setPreview} = useContext(PreviewContext),
        [showDetails, setShowDetails] = useState(false),
        open = preview !== null;
    return <Dialog onClose={() => setPreview(null)} classes={{
        paper: classes.root
    }} fullScreen open={open} {...props}>
        {
            preview && <Fragment>
                {
                    preview.type.class.id === '2' &&
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                onClick={() => setShowDetails(!showDetails)}>
                        <ImagePreview file={preview}/>
                    </motion.div>
                }
            </Fragment>
        }
        <Box style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#00000099'
        }}>
            <Collapse in={showDetails}>
                {

                }
            </Collapse>
        </Box>
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => setPreview(null)} style={{
            background: '#00000022',
            backdropFilter: 'blur(5px)'
        }}>
            <CloseIcon/>
        </IconButton>
    </Dialog>
};

export default PreviewDialog;
