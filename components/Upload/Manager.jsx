import React, {Fragment, useContext, useState} from "react";
import Context from './Context';
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import IconButton from "@material-ui/core/IconButton";
import {Popover} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
    progress: {
        position: 'absolute'
    },
    fileName: {
        marginRight: '8px',
        width: '250px'
    }
}));

const Selector = ({file}) => {

    const classes = useStyles();
    return <ListItem style={{minWidth: '360px'}}>
        <ListItemAvatar>
            <Avatar>
                <CircularProgress className={classes.progress} variant={file.uploadProgress ? 'static' : 'indeterminate'} value={file.uploadProgress} />
                {
                    file.type.class.id === '1' && <InsertDriveFileRoundedIcon />
                }
                {
                    file.type.class.id === '2' && <ImageRoundedIcon />
                }
                {
                    file.type.class.id === '3' && <DescriptionRoundedIcon />
                }
                {
                    file.type.class.id === '4' && <VideocamRoundedIcon />
                }
                {
                    file.type.class.id === '5' && <AudiotrackRoundedIcon />
                }
            </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.fileName}
                      primary={<Typography style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                      }}>{file.name}</Typography>}
                      secondary={`${file.type.name} - ${file.uploadProgress ? `${parseInt(file.uploadProgress)}%` : 'En cola'}`}
        />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Eliminar carga">
                <DeleteForeverRoundedIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>;

};
const UploadManager = () => {

    const uploadContext = useContext(Context),
        classes = useStyles(),
        [anchor, setAnchor] = useState(null),
        open = Boolean(anchor),
        id = open ? 'upload-manager-popover' : undefined;

    const [{uploads}, dispatch] = useContext(Context),
        done = uploads.reduce((count, upload) => upload.done ? count + 1 : count, 0),
        uploading = uploads.reduce((u, upload) => u || upload.uploading, false),
        hasErrors = uploads.reduce((u, upload) => u || upload.error, false);

    return <Fragment>
        {
            uploads.length > 0 && <Fragment>
                <IconButton mr={2} onClick={event => setAnchor(event.currentTarget)}>
                    <CloudUploadRoundedIcon/>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchor}
                    onClose={() => setAnchor(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <List style={{
                        maxHeight: '480px'
                    }}>
                        <ListItem divider style={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: '#fff',
                            zIndex: 2
                        }}>
                            <ListItemText primary={`${uploading ? 'Cargando' : (done ? `Se ${uploads.length === 1 ? 'cargó' : 'cargaron'}` : 'Viendo')} ${uploads.length} archivo${uploads.length > 1 ? 's' : ''}`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="Cerrar" onClick={() => setAnchor(null)} >
                                    <CloseRoundedIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {
                            uploads.map(upload => <Selector key={upload.id} file={upload}/>)
                        }
                    </List>
                </Popover>
            </Fragment>
        }
    </Fragment>;

};

export default UploadManager;
