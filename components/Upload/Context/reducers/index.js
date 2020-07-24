import * as upload from './upload';
import * as types from '../actions/types';

const createReducer = handlers => (state, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
        return state;
    }

    return handlers[action.type](state, action);
};

export default createReducer({
    [types.ADD_UPLOAD]: upload.add,
    [types.REMOVE_UPLOAD]: upload.remove,
    [types.UPDATE_UPLOAD]: upload.update,
    [types.FILTER_UPLOAD]: upload.filter,
    [types.SHOW_STATE]: upload.showState,
});
