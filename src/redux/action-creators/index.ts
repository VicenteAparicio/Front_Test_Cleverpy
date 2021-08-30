import { SAVE } from '../types';
import { Dispatch } from 'redux';
import IAction from '../action';

export const savePosts = (posts: {}) => {
    return (dispatch: Dispatch<IAction>) => {
        dispatch({
            type: SAVE,
            payload: posts
        })
    }
}