import React, {createContext} from 'react';

const PreviewContext = createContext({
    preview: null,
    setPreview: null
});

export default PreviewContext;
