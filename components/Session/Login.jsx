import React, {useContext, useCallback, useState, useEffect} from 'react';
import App from "../App";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useApolloClient} from "@apollo/react-hooks";
import PasswordInput from "./PasswordInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import red from "@material-ui/core/colors/red";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import hex from "crypto-js/enc-hex";
import sha256 from "crypto-js/sha256";
import {nonce, login} from "./queries.graphql";
import {useRouter} from "next/router";
import ReactLottie from "react-lottie";
import successAnimation from "../../public/media/16409-success";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-root': {
            width: '100%',
            marginBottom: '24px'
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
        },
        '&.Mui-disabled': {
            color: '#ccc',
            background: '#57575b'
        }
    },
    linkBtn: {
        textTransform: 'none'
    },
    backdrop: {
        transition: 'opacity 500ms',
        position: 'absolute',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        opacity: 0
    },
    errorMessage: {
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        '& p': {
            color: theme.palette.primary.main
        }
    }
}));

const Login = ({setView, ...props}) => {
    const classes = useStyles(),
        router = useRouter(),
        {agent, setSession} = useContext(App.Context),
        apolloClient = useApolloClient(),
        [success, setSuccess] = useState(false),
        [loading, setLoading] = useState(false),
        [error, setError] = useState('Error al procesar'),
        [showError, setShowError] = useState(false),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    // console.log('---agent---', agent);

    useEffect(() => {
        setShowError(false);
    }, [email, password]);

    const onSubmit = useCallback(event => {
        event.preventDefault();
        const submitData = async () => {
            const nonceResult = await apolloClient.mutate({mutation: nonce});
            if (nonceResult.errors) {
                if (nonceResult.errors.length) {
                    setError(nonceResult.errors[0]);
                } else setError('Error al obtener nonce');
                setShowError(true);
                return;
            }
            const hashedPassword = hex.stringify(sha256(password)),
                saltedData = hex.stringify(sha256(`${agent.id}${hashedPassword}${nonceResult.data.nonce.data}`)),
                loginResult = await apolloClient.mutate({
                    mutation: login,
                    variables: {
                        email, password: saltedData,
                        nonce: nonceResult.data.nonce.id
                    }
                });
            if (loginResult.errors) {
                if (loginResult.errors.length) {
                    setError(loginResult.errors[0]);
                } else setError('Error al iniciar sesión');
                setShowError(true);
                return;
            }
            if (!loginResult.data.login) {
                setError('Correo o contraseña inválidos');
                setShowError(true);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    setSession(loginResult.data.login);
                    const onboarding = loginResult.data.login.user.type.id === '1',
                        redirectTo = !loginResult.data.login.user.verified ? '/awaiting-evaluation' : (onboarding ? '/onboarding' : '/users');
                    router.push(redirectTo, redirectTo);
                }, 2000);
            }
        };
        setLoading(true);
        setShowError(false);
        setTimeout(() => {
            submitData().catch(error => {
                setError(error);
                setShowError(true);
            }).finally(() => {
                setLoading(false);
            });
        }, 500);
    }, [apolloClient, email, password, setError, setShowError]);

    return <Box className={classes.root}>
        <Box style={{
            transition: 'filter 500ms',
            filter: loading ? 'grayscale(1)' : 'grayscale(0)'
        }}>
            <form onSubmit={onSubmit}>
                <TextField required label={"Email"} type={"email"} fullWidth value={email}
                           onChange={event => setEmail(event.target.value)}/>
                <PasswordInput value={password} onChange={setPassword}/>
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
                    <Button disabled={loading} type={"submit"} disableElevation className={classes.blackBtn}
                            variant={"contained"}>
                        {
                            !loading && 'Entrar'
                        }
                        {
                            loading && <Box display={"flex"} alignItems={"center"}>
                                <Box mr={"12px"} lineHeight={"18px"}>
                                    <CircularProgress size={18}/>
                                </Box>
                                <Box>Cargando...</Box>
                            </Box>
                        }
                    </Button>
                </Box>
            </form>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mb={"36px"}>
                <Box mr={'6px'} flexGrow={1}>
                    <Typography>¿Olvidaste tu contraseña?</Typography>
                </Box>
                <Box>
                    <Button disabled={loading} color={"primary"} size={"small"} className={classes.linkBtn}
                            onClick={() => setView('recover')}>Recupérala
                        aquí</Button>
                </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Box mb={'6px'}>
                    <Typography>¿No tienes cuenta?</Typography>
                </Box>
                <Button disabled={loading} color={"primary"} size={"small"} className={classes.linkBtn}
                        onClick={() => setView('sign-up')}>Regístrate</Button>
            </Box>
        </Box>
        <Box className={classes.backdrop} style={{
            opacity: success ? 1 : 0,
            display: success ? 'flex' : 'none'
        }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} mt={"-80px"}>
                {
                    success && <ReactLottie isClickToPauseDisabled width={100} height={100} options={{
                        loop: false,
                        autoPlay: true,
                        animationData: successAnimation
                    }}/>
                }
                <Typography color={"primary"}>Sus datos son correctos</Typography>
                <Typography variant={"h4"} color={"primary"}>Bienvenido</Typography>
            </Box>
        </Box>
    </Box>
};

export default Login;
