export const add = (state, { payload }) => ({
    ...state,
    uploads: [...state.uploads, ...(Array.isArray(payload.upload) ? payload.upload : [payload.upload])],
});

export const remove = (state, { payload }) => {
    const ids = (Array.isArray(payload.upload) ? payload.upload : [payload.upload]).map(upload => upload.id);
    return {
    ...state,
        uploads: state.uploads.filter(t => !ids.includes(t.id)),
    }
};

export const update = (state, { payload }) => ({
    ...state,
    uploads: state.uploads.map(t => (t.id === payload.upload.id ? payload.upload : t)),
});

export const filter = (state, { payload }) => ({
    ...state,
    filter: payload.filter
});

export const showState = (state, { payload }) => ({
    ...state,
    state: payload.state
});