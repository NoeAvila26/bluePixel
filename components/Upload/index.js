import Context from "./Context/store/context";
import {Provider} from "./Context/store";
import {addUpload, removeUpload, updateUpload, filterUpload, showState} from './Context/actions';
import Manager from './Manager';

export default {
    addUpload, removeUpload, updateUpload, filterUpload, showState,
    Provider, Context, Manager
};

export {
    addUpload, removeUpload, updateUpload, filterUpload, showState,
    Provider, Context, Manager
};