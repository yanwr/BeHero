import HttpRequest from '../httpRequest/HttpRequest';
import { Logger } from '../Log/Logger';
import { saveOngInLocalStorage, clearLocalStorage, getOngByLocalStorage } from '../session/SessionService';

const logger = new Logger('User.reducer.js');

export const ACTION_TYPES = {
    RESET_THIS_REDUCER: 'session/RESET_THIS_REDUCER',
    LOADING: 'session/LOADING',
    LOGIN_SUCCESS: 'session/LOGIN_SUCCESS',
    LOGIN_FAIL: 'session/LOGIN_FAIL',
    LOGOUT_SUCCESS: 'session/LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'session/LOGOUT_FAIL',
};

const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_THIS_REDUCER:
            return initialState;
        case ACTION_TYPES.LOADING:
            return {...state, loading: true };
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {...state, loading: false };
        case ACTION_TYPES.LOGIN_FAIL:
            return {...state, loading: false };
        case ACTION_TYPES.LOGOUT_SUCCESS:
            return {...state, loading: false };
        case ACTION_TYPES.LOGOUT_FAIL:
            return {...state, loading: false };
        default:
            return state;
    }
}

export const handleDoLogin = (id, navigation) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    try{
        logger.info(`Try to do login with id: ${id}.`);
        const result = await HttpRequest.post('/login', { id });
        logger.info(`Login done with success. Id ${id}.`);
        const { data } = result;
        const name = data.name;
        saveOngInLocalStorage(id, name);
        dispatch({ 
            type: ACTION_TYPES.LOGIN_SUCCESS,
        });
        navigation.push('/incidents');
    } catch(e) {
        logger.error(`Fail to do login with id ${id}.`);
        alert('Falha ao logar.');
        dispatch({ type: ACTION_TYPES.LOGIN_FAIL });
    }
};

export const handleDoLogout = (id, navigation) => (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    try{
        logger.info(`Try to do logout with id: ${id}.`);
        clearLocalStorage();
        resetThisReducerState()(dispatch, getState);
        logger.info(`Logout done with success.`);
        dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS });
        navigation.push('/');
    } catch(e) {
        logger.error(`Fail to do logout with id ${id}.`);
        alert('Falha ao deslogar.');
        dispatch({ type: ACTION_TYPES.LOGOUT_FAIL });
    }
};

const resetThisReducerState = () => (dispatch, getState) => {
    logger.info(`Try to reset state from reducer.`);
    dispatch({
        type: ACTION_TYPES.RESET_THIS_REDUCER
    });
    logger.info(`Reset state from reducer done.`);
};