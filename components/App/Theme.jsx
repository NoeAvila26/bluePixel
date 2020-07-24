import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import * as locales from '@material-ui/core/locale';

const Theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"'
        ].join(','),
    },
    palette: {
        primary: {
            main: '#FF9716',
        },
        secondary: {
            main: '#757F9A',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
            paper: '#fff'
        }
    },
    zIndex: {
        drawer: 1000
    },
    overrides: {
        MuiTypography: {
            body1: {
                fontSize: '14px',
                color: '#1B1B1C'
            }
        },
        MuiButton: {
            label: {
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
            },
            containedPrimary: {
                color: '#fff',
                background: 'linear-gradient(180deg, #FFBE72 0%, #FF9716 100%)',
                borderRadius: '8px',
                '&:hover': {
                    background: 'linear-gradient(180deg, #ffc380 0%, #ffa333 100%)',
                }
            }
        },
        MuiAvatar: {
            colorDefault: {
                backgroundColor: '#757F9A',
                color: '#fff'
            }
        }
    }
}, locales['esES']);

export default Theme;
