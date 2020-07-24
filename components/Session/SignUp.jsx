import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import PasswordInput from "./PasswordInput";
import App, {useDebounce} from "../App";
import {useApolloClient} from "@apollo/react-hooks";
import baseConfig from "../../base.config";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {signUp} from "./queries.graphql";
import ReactLottie from "react-lottie";
import successAnimation from "../../public/media/16409-success";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import hex from "crypto-js/enc-hex";
import sha256 from "crypto-js/sha256";
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btnProgress: {
        color: '#ccc'
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
        transition: 'background-color 500ms',
        '&:hover': {
            background: '#3e3e41'
        },
        '&.Mui-disabled': {
            color: '#ccc',
            background: '#57575b'
        }
    },
    linkBtn: {
        textTransform: 'none'
    },
    text1: {
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%'
    },
    nameInput: {
        '& input': {
            textTransform: 'capitalize'
        }
    },
    backdrop: {
        transition: 'opacity 500ms',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff'
    }
}));

const SignUp = ({setView, ...props}) => {
    const classes = useStyles(),
        {setSession} = useContext(App.Context),
        apolloClient = useApolloClient(),
        recaptchaRef = useRef(null),
        theme = useTheme(),
        isSm = useMediaQuery(theme.breakpoints.up('sm')),
        {agent} = useContext(App.Context),
        [loading, setLoading] = useState(false),
        [success, setSuccess] = useState(false),
        [error, setError] = useState('Error al procesar'),
        [showError, setShowError] = useState(false),
        [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [gre, setGre] = useState(null),
        [emailExists, setEmailExists] = useState(false);

    const onSubmit = useCallback(event => {
        event.preventDefault();
        const submitData = async() => {
            const hashedPassword = hex.stringify(sha256(password));
            const {data, errors} = await apolloClient.mutate({
                mutation: signUp,
                variables: {
                    gre, firstName, lastName, email,
                    password: hashedPassword,
                }
            });
            if(errors) {
                if(errors.length) {
                    setError(errors[0]);
                } else setError('Error al cargar los datos');
                setShowError(true);
                return;
            }
            if(data.signUp.status === 1) {
                setEmailExists(true);
            } else if(data.signUp.status === 2) {
                setError('Error al validar ReCAPTCHA');
                setShowError(false);
            } else if(data.signUp.status === 3 && data.signUp.session) {
                setSuccess(true);
            } else {
                setError('Error al cargar los datos');
                setShowError(false);
            }
        };
        setLoading(true);
        submitData().catch(error => {
            setShowError(true);
            setError(error);
        }).finally(() => {
            setLoading(false);
            setGre(null);
            if(recaptchaRef.current) recaptchaRef.current.reset();
        })
    }, [firstName, lastName, email, password, gre, setShowError, setSuccess, setLoading, setSession, setError, recaptchaRef]);

    useEffect(() => {
        if (!recaptchaRef.current) return;
        recaptchaRef.current.reset();
        setGre(null);
    }, [recaptchaRef.current]);

    useEffect(() => {
        setGre(null);
    }, [isSm]);

    useEffect(() => {
        setShowError(false);
    }, [firstName, lastName, email, password, gre]);

    useEffect(() => {
        setEmailExists(false);
    }, [email])

    return <Box className={classes.root}>
        <Box mb={"12px"} width={"100%"}>
            <Typography className={classes.text1}>Registro de usuarios</Typography>
        </Box>
        <form onSubmit={onSubmit}>
            <Box mb={"24px"} width={"100%"}>
                <TextField value={firstName} onChange={event => setFirstName(event.target.value)}
                           className={classes.nameInput} required label={"Nombre(s)"} type={"text"} name={"first-name"}
                           autoComplete={"fname"} fullWidth/>
            </Box>
            <Box mb={"24px"} width={"100%"}>
                <TextField value={lastName} onChange={event => setLastName(event.target.value)}
                           className={classes.nameInput} required label={"Apellido(s)"} type={"text"} name={"last-name"}
                           autoComplete={"lname"} fullWidth/>
            </Box>
            <Box mb={"24px"} width={"100%"}>
                <TextField value={email} onChange={event => setEmail(event.target.value)} required label={"Email"}
                           type={"email"} name={"email"} autoComplete={"email"} fullWidth/>
            </Box>
            <Collapse in={emailExists}>
                <Box display={"flex"} alignItems={"center"} mb={"12px"}>
                    <Box flexGrow={1} mr={"6px"}>
                        <Typography>Éste correo ya está dado de alta.</Typography>
                    </Box>
                    <Button className={classes.linkBtn} color={"primary"} size={"small"}>
                        Recuperar contraseña
                    </Button>
                </Box>
            </Collapse>
            <Box mb={"24px"} width={"100%"}>
                {/*<TextField required label={"Contraseña"} name={"password"} type={"password"} fullWidth/>*/}
                <PasswordInput value={password} onChange={setPassword}/>
            </Box>
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
            <Box mb={"24px"} width={"100%"}>
                <Collapse in={showError}>
                    <Box className={classes.errorMessage}>
                        <Box mr={"6px"} lineHeight={'14px'}>
                            <ErrorOutlineIcon/>
                        </Box>
                        <Box flexGrow={1} mr={"6px"}>
                            <Typography>{error ? error.toLocaleString() : 'Error al procesar'}</Typography>
                        </Box>
                        <IconButton color={"primary"} size={"small"} onClick={() => setShowError(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Collapse>
                <Button disabled={loading || emailExists || !gre} type={"submit"} disableElevation className={classes.blackBtn}
                        variant={"contained"}>
                    {
                        !loading && 'Crear cuenta'
                    }
                    {
                        loading && <Box display={"flex"} alignItems={"center"}>
                            <Box mr={"12px"} lineHeight={"18px"}>
                                <CircularProgress size={18} className={classes.btnProgress}/>
                            </Box>
                            <Box>Cargando...</Box>
                        </Box>
                    }
                </Button>
                {/*<Button disabled={emailExists || !gre} type={"submit"} disableElevation className={classes.blackBtn}*/}
                {/*        variant={"contained"}>Crear cuenta</Button>*/}
            </Box>
        </form>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box mb={'6px'}>
                <Typography>¿Ya tienes cuenta?</Typography>
            </Box>
            <Button color={"primary"} size={"small"} className={classes.linkBtn} onClick={() => setView(null)}>Inicia
                sesión</Button>
        </Box>
        <Box className={classes.backdrop} style={{
            opacity: success ? 1 : 0,
            display: success ? 'flex' : 'none'
        }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={"-80px"}>
                <ReactLottie isClickToPauseDisabled width={100} height={100} options={{
                    loop: false,
                    autoPlay: true,
                    animationData: successAnimation
                }}/>
                <Typography variant={"h4"} color={"primary"}>Bienvenido</Typography>
            </Box>
        </Box>
    </Box>
};

export default SignUp;
