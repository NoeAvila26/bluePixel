import React, {useContext, useState} from 'react';
import Box from "@material-ui/core/Box";
import baseConfig from "../../base.config";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PreviewContext from "./PreviewContext";
import SwipeableViews from 'react-swipeable-views';
import useTheme from "@material-ui/core/styles/useTheme";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from '@material-ui/icons/ZoomIn';

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
        backgroundColor: '#000',
        backdropFilter: 'blur(12px)',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
        // background: 'radial-gradient(circle, #202020 0%, #000 100%)',
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

const FileGallery = ({files, ...props}) => {
    const classes = useStyles(),
        theme = useTheme(),
        [activeStep, setActiveStep] = useState(0),
        {setPreview} = useContext(PreviewContext);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep === files.length - 1 ? 0 : prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep === 0 ? files.length - 1 : prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return <Box position={"relative"}>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
            {
                files.map(file => <Box key={file.id}>
                    <Box className={classes.previewWrapper} style={{
                        backgroundImage: `url(${baseConfig.previewRoot}/${file.id}/720)`,
                    }}>
                        <IconButton onClick={() => setPreview(file)} style={{
                            color: '#fff',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-36px',
                            marginLeft: '-36px',
                            backdropFilter: 'blur(5px)',
                            background: '#00000022'
                        }}>
                            <ZoomInIcon style={{fontSize: '48px'}}/>
                        </IconButton>
                    </Box>
                </Box>)
            }
        </SwipeableViews>
        <Box position={"absolute"} top={"50%"} left={"12px"} mt={"-24px"}>
            <IconButton onClick={handleBack} style={{
                color: '#fff',
                background: '#00000022',
                backdropFilter: 'blur(5px)'
            }}>
                <ArrowBackIosIcon/>
            </IconButton>
        </Box>
        <Box position={"absolute"} top={"50%"} right={"12px"} mt={"-24px"}>
            <IconButton onClick={handleNext} style={{
                color: '#fff',
                background: '#00000022',
                backdropFilter: 'blur(5px)',
            }}>
                <ArrowForwardIosIcon/>
            </IconButton>
        </Box>
    </Box>;
};

export default FileGallery;
