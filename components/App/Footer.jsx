import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    wrapper: {
        [theme.breakpoints.up('md')]: {
            scrollSnapAlign: 'end'
        }
    },
    root: {
        backgroundColor: '#fff',
        width: '100%',
        paddingRight: '30px',
        paddingLeft: '30px',
        [theme.breakpoints.up('sm')]: {
            paddingRight: '80px',
            paddingLeft: '80px',
        },
        paddingTop: '30px !important',
        paddingBottom: '30px !important',
        position: 'relative'
    },
    text1: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        textTransform: 'uppercase'
    },
    text2: {
        fontSize: '14px',
        display: 'inline-block',
        marginBottom: theme.spacing(0.5),
        textDecoration: 'none',
        color: '#5F6F71',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    footerIcon: {
        marginRight: theme.spacing(0.5)
    },
    footerLink1: {
        color: theme.palette.grey["800"],
        textDecoration: "none"
    },
    bootstrap: {
        width: '100%',
        height: '24px',
        background: theme.palette.secondary.main
    }
}));

const Footer = () => {
    const classes = useStyles(),
        theme = useTheme(),
        isXs = useMediaQuery(theme.breakpoints.down('xs'));

    return <Box className={classes.wrapper}>
        <Box className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <Typography className={classes.text1} color={"primary"}>Saber más</Typography>
                    <Typography className={classes.text2} component={"a"} href={"#estadisticas"}>Estadísticas</Typography>
                    <br/>
                    <Typography className={classes.text2} component={"a"} href={"#estadisticas"}>Situación</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography className={classes.text1} color={"primary"}>¿Cómo apoyar?</Typography>
                    <Typography className={classes.text2} component={"a"} href={"#testimonios"}>Testimonios</Typography>
                    <br/>
                    <Typography className={classes.text2} component={"a"} href={"#testimonios"}>Propuestas</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography className={classes.text1} color={"primary"}>Acerca de</Typography>
                    <Typography className={classes.text2} component={"a"} href={"#quienes-somos"}>¿Quiénes somos?</Typography>
                    <br/>
                    <Typography className={classes.text2} component={"a"} href={"#quienes-somos"}>Objetivo</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography className={classes.text1} color={"primary"}>Contacto</Typography>
                    <IconButton size={"small"} className={classes.footerIcon} href={"https://twitter.com/Nuevetemx"} target={"_blank"}>
                        <TwitterIcon/>
                    </IconButton>
                    <IconButton size={"small"} className={classes.footerIcon} href={"https://www.facebook.com/NueveteMx"} target={"_blank"}>
                        <FacebookIcon/>
                    </IconButton>
                    <IconButton size={"small"} className={classes.footerIcon} href={"https://www.instagram.com/nuevetemx/"} target={"_blank"}>
                        <InstagramIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    </Box>;
};

export default Footer;