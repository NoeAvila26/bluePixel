import {useEffect, useRef, useState} from 'react';
import Theme from './Theme';
import Context from './Context';
import Logo from './Logo';
import Nav from './Nav';
import Footer from './Footer';
// import {defaultTheme} from "react-select";

const parseCookieHeader = (queryString) => {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('; ');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};

const SelectCustomStyles = {
    dark: {
        input: (provided) => ({
            ...provided,
            paddingTop: '4px',
            paddingBottom: '4px'
        }),
    },
    light: {
        input: (provided) => ({
            ...provided,
            paddingTop: '4px',
            paddingBottom: '4px'
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#32cbc7',
            color: '#ffffff'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#ffffff'
        })
    }
};
//
// const SelectThemes = {
//     dark: {
//         primary: '#32cbc7',
//         primary25: '#0f3d3c',
//         primary50: '#145250',
//         primary75: '#29a39f',
//         neutral0: '#0e1f28',
//         neutral5: '#142c39',
//         neutral10: '#1b3a4b',
//         neutral20: '#21495e',
//         neutral30: '#2e6684',
//         neutral40: '#4292bd',
//         neutral50: '#68a8ca',
//         neutral60: '#7bb3d1',
//         neutral70: '#a1c8de',
//         neutral80: '#d9e9f2',
//         neutral90: '#ecf4f8'
//     },
//     light: {
//         primary: '#32cbc7',
//         primary25: '#d6f5f4',
//         primary50: '#adebe9',
//         primary75: '#70dbd8',
//         neutral0: defaultTheme.colors.neutral0,
//         neutral5: defaultTheme.colors.neutral5,
//         neutral10: defaultTheme.colors.neutral10,
//         neutral20: defaultTheme.colors.neutral20,
//         neutral30: defaultTheme.colors.neutral30,
//         neutral40: defaultTheme.colors.neutral40,
//         neutral50: defaultTheme.colors.neutral50,
//         neutral60: defaultTheme.colors.neutral60,
//         neutral70: defaultTheme.colors.neutral70,
//         neutral80: defaultTheme.colors.neutral80,
//         neutral90: defaultTheme.colors.neutral90
//     }
// };

const CodeInputThemes = {
    dark: {
        "fontFamily": "monospace",
        "MozAppearance": "textfield",
        "borderRadius": "6px",
        "border": "1px solid",
        "boxShadow": "none",
        "marginRight": "0.5rem",
        "paddingLeft": "0px",
        "width": "32px",
        "height": "32px",
        "fontSize": "21px",
        "boxSizing": "border-box",
        "color": "#ccc",
        "textAlign": "center",
        "backgroundColor": "#202020",
        "borderColor": "#454545"
    }, light: {
        "fontFamily": "monospace",
        "MozAppearance": "textfield",
        "borderRadius": "6px",
        "border": "1px solid",
        "boxShadow": "none",
        "marginRight": "0.5rem",
        "paddingLeft": "0px",
        "width": "32px",
        "height": "32px",
        "fontSize": "21px",
        "boxSizing": "border-box",
        "color": "black",
        "textAlign": "center",
        "backgroundColor": "white",
        "borderColor": "lightgrey"
    }
};

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
};

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ]
}

const parseGmtOffset = seconds => {
    const hours = Math.floor(Math.abs(seconds) / 3600),
        minutes = Math.floor((Math.abs(seconds) - (hours * 3600)) / 60);
    return `${seconds < 0 ? '-' : '+'}${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const emoji_i18n = {
    search: 'Buscar',
    clear: 'Limpiar', // Accessible label on "clear" button
    notfound: 'No se encontró ningún emoji',
    skintext: 'Escoja su tono de piel',
    categories: {
        search: 'Resultados de búsqueda',
        recent: 'Usados frecuentemente',
        smileys: 'Caras y emociones',
        people: 'Personas',
        nature: 'Animales y naturaleza',
        foods: 'Comida y bebida',
        activity: 'Actividades',
        places: 'Viajes y lugares',
        objects: 'Objetos',
        symbols: 'Símbolos',
        flags: 'Banderas',
        custom: 'Personalizados',
    },
    categorieslabel: 'Categorías', // Accessible title for the list of categories
    skintones: {
        1: 'Tono de piel defacto',
        2: 'Tono de piel claro',
        3: 'Tono de piel ligeramente claro',
        4: 'Todo de piel medio',
        5: 'Tono de piel ligeramente oscuro',
        6: 'Tono de piel oscuro',
    }
};

export default {Context, Theme, Nav, Logo};

export {
    emoji_i18n,
    Theme,
    Context,
    Nav,
    Logo,
    Footer,
    CodeInputThemes,
    // SelectThemes,
    SelectCustomStyles,
    parseCookieHeader,
    useInterval,
    useDebounce,
    parseGmtOffset,
    useFocus
};
