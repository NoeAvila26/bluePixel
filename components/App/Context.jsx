import React, {createContext} from 'react';

const Context = createContext({
    agent: null,
    session: null,
    timezone: null
});

export default Context;
