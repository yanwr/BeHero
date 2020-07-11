import HttpRequest from '../../shared/httpRequest/HttpRequest';
import { Logger } from '../../shared/Log/Logger';

const logger = new Logger('RegisterPage.reducer.js');

export const ACTION_TYPES = {
    LOADING: 'registerOng/LOADING',
    SET_NEW_ONG_SUCCESS: 'registerOng/SET_NEW_ONG_SUCCESS',
    SET_NEW_ONG_FAIL: 'register/SET_NEW_ONG_FAIL'
};

const initialState = {
    loading: false,
    id: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOADING:
            return {...state, loading: true};
        case ACTION_TYPES.SET_NEW_ONG_SUCCESS:
            return {...state, loading: false, id: action.payload};
        case ACTION_TYPES.SET_NEW_ONG_FAIL:
            return {...state, loading: false};
        default:
            return state;
    }
}

export const setNewOng = (name, email, whatsapp, city, uf, navigation) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    try {
        logger.info(`Try to register a new ong with email ${email}.`);
        const body = {name, email, whatsapp, city, uf};
        const result = await HttpRequest.post('/ongs', body);
        logger.info(`Ong registered with success. OngId: ${result.data.id}`);
        dispatch({ 
            type:ACTION_TYPES.SET_NEW_ONG_SUCCESS,
            payload: result.data.id
        });
        alert(`Ong registrada com sucesso. Seu login é ${result.data.id}`);
        navigation.push('/', { id: result.data.id });
    } catch (e) {
        logger.info(`Fail to register Ong.`);
        dispatch({ type:ACTION_TYPES.SET_NEW_ONG_FAIL});
        alert('Falha ao registrar ONG.');
    }
};
