import React, {Fragment, useContext, useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "next/link";
import {useRouter} from "next/router";
import Avatar from "@material-ui/core/Avatar";
import ToggleButton from "@material-ui/lab/ToggleButton";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Context from "./Context";
import Typography from "@material-ui/core/Typography";
import {useApolloClient, useSubscription} from "@apollo/react-hooks";
import {loggedOut, logout} from "./queries.graphql";
import {motion} from "framer-motion";
import baseConfig from "../../base.config";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        paddingTop: '12px',
        display: 'flex',
        alignItems: 'center',
        '& .MuiToggleButton-root': {
            fontSize: '12px',
            borderColor: 'transparent',
            textTransform: 'capitalize',
            color: '#fff',
            marginRight: '12px',
            height: '30px',
            transition: 'box-shadow 600ms, background-color 300ms, border-color 700ms, color 300ms'
        },
        '& .MuiToggleButton-root.Mui-selected': {
            backgroundColor: '#fff',
            color: '#FF9716',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.18)'
        },
        '& .MuiToggleButton-root .liner': {
            position: 'absolute',
            bottom: '-1px',
            left: '-1px',
            right: '-1px',
            background: 'linear-gradient(90deg, #FFE259 0%, #FF9716 100%)',
            height: '4px',
            borderRadius: '0 0 4px 4px',
            opacity: 0,
            transition: 'opacity 300ms'
        },
        '& .MuiToggleButton-root.Mui-selected .liner': {
            opacity: 1
        }
    },
    mobileMenu: {
        '& .MuiMenuItem-root': {
            paddingLeft: '32px !important',
            paddingRight: '32px !important'
        }
    },
    avatarWrapper: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        '& .MuiIconButton-root': {
            border: '3px solid #fff',
            padding: '3px',
            boxShadow: '0px 0px 7.2px rgba(0, 0, 0, 0.25)'
        }
    },
    bigAvatar: {
        width: '28px',
        height: '28px',
        paddingTop: '1px',
        fontSize: '16px'
    },
    smallAvatar: {
        fontSize: '12px',
        width: '24px',
        height: '24px'
    }
}));

const NavButton = ({href, ...props}) => {

    const router = useRouter(),
        selected = router.pathname === href;

    return <Link href={href}>
        <ToggleButton value={href} selected={selected} {...props}>
            {props.children}
            {
                selected && <Box className={"liner"}/>
            }
        </ToggleButton>
    </Link>
};

const MobileNavButton = ({href, onClick, ...props}) => {
    const router = useRouter(),
        selected = router.pathname === href;
    return <Link href={href} passHref>
        <MenuItem component={"a"} selected={selected} onClick={onClick} {...props}>{props.children}</MenuItem>
    </Link>;
};

const Nav = () => {
    const classes = useStyles(),
        apolloClient = useApolloClient(),
        router = useRouter(),
        {setSession, session} = useContext(Context),
        theme = useTheme(),
        [menuAnchor, setMenuAnchor] = useState(null),
        [settingsAnchor, setSettingsAnchor] = useState(null),
        isSm = useMediaQuery(theme.breakpoints.up('sm')),
        logoutEvent = useSubscription(loggedOut, {
            shouldResubscribe: true
        });

    const handleMenuClose = () => setMenuAnchor(null);

    const handleSettingsClose = () => setSettingsAnchor(null);

    const logoutHandler = () => {
        if (!confirm('¿Está seguro que desea cerrar sesión?')) return;
        const _logout = async () => {
            const {errors, data} = await apolloClient.mutate({
                mutation: logout
            });
            if (errors) {
                if (errors.length) {
                    alert(errors[0]);
                } else alert('Error al cargar los datos');
            }
            await router.push('/login', '/login', {shallow: false});
            setSession(null);
        };
        _logout().catch(error => window.alert(error.toLocaleString()));
    };

    useEffect(() => {
        if (!logoutEvent.data) return;
        if (logoutEvent.loading) return;
        router.push('/login', '/login', {shallow: false}).then(() => {
            setSession(null);
        });
    }, [logoutEvent]);

    return <motion.div initial={{y: '-100%'}} animate={{y: 0}} exit={{y: '-100%'}} transition={{delay: 1}}>
        <Container maxWidth={"xl"} className={classes.root}>
            {
                !isSm && <Fragment>
                    <IconButton onClick={event => setMenuAnchor(event.target)} style={{
                        background: '#00000011'
                    }}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu className={classes.mobileMenu}
                          anchorEl={menuAnchor}
                          keepMounted
                          open={Boolean(menuAnchor)}
                          onClose={handleMenuClose}
                    >
                        {/*<MobileNavButton href={"/"} onClick={handleMenuClose}>Inicio</MobileNavButton>*/}
                        {
                            session.user.type.id === '3' && <MobileNavButton href={"/activities"}
                                                                                        onClick={handleMenuClose}>Actividades</MobileNavButton>
                        }
                        <MobileNavButton href={"/profile"} onClick={handleMenuClose}>Perfil</MobileNavButton>
                        <MobileNavButton href={"/calendar"} onClick={handleMenuClose}>Calendario</MobileNavButton>
                        {
                            session.user.type.id === '1' && <Fragment>
                                <MobileNavButton href={"/onboarding"} onClick={handleMenuClose}>Actividades</MobileNavButton>
                                <MobileNavButton href={"/ranking"} onClick={handleMenuClose}>Ranking</MobileNavButton>
                                <MobileNavButton href={"/awards"} onClick={handleMenuClose}>Premios</MobileNavButton>
                            </Fragment>
                        }
                        {
                            session && <Fragment>
                                {
                                    session.user.type.id === '2' && <Fragment>
                                        <MobileNavButton href={"/users"} onClick={handleMenuClose}>Colaboradores</MobileNavButton>
                                    </Fragment>
                                }
                                {
                                    session.user.type.id === '3' && <Fragment>
                                        <MobileNavButton href={"/users"} onClick={handleMenuClose}>Usuarios</MobileNavButton>
                                        <MobileNavButton href={"/activities"} onClick={handleMenuClose}>Actividades</MobileNavButton>
                                    </Fragment>
                                }
                            </Fragment>
                        }
                        <MobileNavButton href={"/chat"} onClick={handleMenuClose}>Chat</MobileNavButton>
                    </Menu>
                </Fragment>
            }
            {
                isSm && <Box>
                    {
                        session.user.type.id.toString === '3' && <NavButton href={"/activities"}>Actividades</NavButton>
                    }
                    {
                        session && <Fragment>
                            {
                                session.user.type.id === '1' && <Fragment>
                                    <NavButton href={"/onboarding"}>Actividades</NavButton>
                                    <NavButton href={"/ranking"}>Ranking</NavButton>
                                    <NavButton href={"/awards"}>Premios</NavButton>
                                </Fragment>
                            }
                            {
                                session.user.type.id === '2' && <Fragment>
                                    <NavButton href={"/users"}>Colaboradores</NavButton>
                                </Fragment>
                            }
                            {
                                session.user.type.id === '3' && <Fragment>
                                    <NavButton href={"/users"}>Usuarios</NavButton>
                                    <NavButton href={"/activities"}>Actividades</NavButton>
                                </Fragment>
                            }
                        </Fragment>
                    }
                    <NavButton href={"/calendar"}>Calendario</NavButton>
                    <NavButton href={"/chat"}>Chat</NavButton>
                </Box>
            }
            <Box className={classes.avatarWrapper}>
                <IconButton onClick={event => setSettingsAnchor(event.target)}>
                    <Avatar style={{width: '48px', height: '48px', border: 'transparent'}}
                        src={session.user.profileImage ? `${baseConfig.previewRoot}/${session.user.profileImage.id}` : undefined}
                        className={classes.bigAvatar}>{session.user.fullName.match(/\b\w/g).slice(0, 2).join('').toUpperCase()}</Avatar>
                </IconButton>
                <Menu anchorEl={settingsAnchor}
                      keepMounted
                      open={Boolean(settingsAnchor)}
                      onClose={handleSettingsClose} style={{width: '480px'}}>
                    <MobileNavButton href={"/profile"} onClick={handleSettingsClose}>
                        <Box width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            <Box mb={"12px"}>
                                <Avatar style={{width: '64px', height: '64px'}}
                                        src={session.user.profileImage ? `${baseConfig.previewRoot}/${session.user.profileImage.id}` : undefined}
                                        className={classes.bigAvatar}>{session.user.fullName.match(/\b\w/g).slice(0, 2).join('').toUpperCase()}</Avatar>
                            </Box>
                            <Typography style={{
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                fontSize: '16px'
                            }}>{session.user.fullName}</Typography>
                        </Box>
                    </MobileNavButton>
                    <MenuItem style={{
                        textAlign: 'center'
                    }} onClick={() => {
                        logoutHandler();
                        setTimeout(handleSettingsClose, 0);
                    }}>Cerrar sesión</MenuItem>
                </Menu>
            </Box>
        </Container>
    </motion.div>
};

export default Nav;
