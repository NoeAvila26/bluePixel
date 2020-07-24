import React, {useContext} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import baseConfig from "../../base.config";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PreviewContext from "./PreviewContext";

const useStyles = makeStyles(theme => ({
    root: {
        width: '50vw',
        [theme.breakpoints.up('md')]: {
            width: '33vw'
        },
        [theme.breakpoints.up('lg')]: {
            width: '20vw'
        }
    },
    previewWrapper: {
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        background: 'radial-gradient(circle, #202020 0%, #000 100%)'
    },
    preview: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
}));

const FileCard = ({file, ...props}) => {
    const classes = useStyles(),
        {setPreview} = useContext(PreviewContext);
    return <Card elevation={2} className={classes.root} {...props}>
        <CardActionArea onClick={() => {
            setPreview(file);
        }}>
            <Box className={classes.previewWrapper}/>
            <Box className={classes.preview} style={{
                backgroundImage: `url(${baseConfig.previewRoot}/${file.id})`,
            }}/>
        </CardActionArea>
    </Card>;
};

export default FileCard;
