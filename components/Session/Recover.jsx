import React, {useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import baseConfig from "../../base.config";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-root': {
            marginBottom: '24px'
        },
        '& form': {
            width: '100%'
        }
    },
    blackBtn: {
        width: '100%',
        textTransform: 'none',
        color: '#fff',
        background: '#1B1B1C',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '16px',
        borderRadius: '8px',
        '&:hover': {
            background: '#323234'
        }
    },
    linkBtn: {
        textTransform: 'none'
    },
    text1: {
        fontSize: '16px',
        fontWeight: 'bold'
    }
}));

const Recover = ({setView, ...props}) => {
    const classes = useStyles(),
        theme = useTheme(),
        recaptchaRef = useRef(),
        [email, setEmail] = useState(''),
        [loading, setLoading] = useState(false),
        [success, setSuccess] = useState(false),
        [error, setError] = useState('Error al procesar'),
        [showError, setShowError] = useState(false),
        [gre, setGre] = useState(null),
        isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const onSubmit = event => {
        event.preventDefault();
    };

    useEffect(() => {
        setGre(null);
    }, [isSm]);

    useEffect(() => {
        setShowError(false);
    }, [email, gre]);

    return <Box className={classes.root}>
        <Box mb={"12px"} width={"100%"}>
            <Box mb={"6px"}>
                <Typography className={classes.text1}>Recuperar contraseña</Typography>
            </Box>
            <Typography>Ingresa tu email y te enviaremos un código para que puedas recuperar tu contraseña</Typography>
        </Box>
        <form onSubmit={onSubmit}>
            <TextField required label={"Email"} type={"email"} fullWidth/>
            <Box mb={"24px"} width={"100%"}>
                <Box mb={"24px"} width={"100%"} display={"flex"} justifyContent={"center"}>
                    {
                        !isSm && <ReCAPTCHA sitekey={baseConfig.recaptchaSiteKey} ref={recaptchaRef}
                                            onChange={response => setGre(response)} size={"compact"}
                                            onExpired={() => setGre(null)} onErrored={() => setGre(null)}/>
                    }
                    {
                        isSm && <ReCAPTCHA sitekey={baseConfig.recaptchaSiteKey} ref={recaptchaRef}
                                           onChange={response => setGre(response)}
                                           onExpired={() => setGre(null)} onErrored={() => setGre(null)}/>
                    }
                </Box>
                <Button type={"submit"} disableElevation className={classes.blackBtn} variant={"contained"}>Solicitar código</Button>
            </Box>
        </form>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Button color={"primary"} size={"small"} className={classes.linkBtn} onClick={() => setView(null)}>Cancelar</Button>
        </Box>
    </Box>
};

export default Recover;
