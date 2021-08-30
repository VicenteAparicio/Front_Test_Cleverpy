import {SAVE} from '../types';
import IAction from '../action';

const initialState = {};

const saveReducer = (state:{} = initialState, action: IAction) => {
    switch (action.type) {
        case SAVE:
            return action.payload;
        default:
            return state;
    }
}

export default saveReducer;