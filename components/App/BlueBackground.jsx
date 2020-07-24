import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(90deg, #757F9A -13.87%, #D7DDE8 133.07%)',
        width: '100%',
        minHeight: '100vh'
    },
    dots: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'url(/media/dots-bg.png) repeat-x',
        width: '100%',
        height: '140px'
    }
}));

const BlueBackground = (props) => {
    const classes = useStyles();
    return <Box className={classes.root}>
        <Box className={classes.dots}/>
        {
            props.children
        }
    </Box>
};

export default BlueBackground;
