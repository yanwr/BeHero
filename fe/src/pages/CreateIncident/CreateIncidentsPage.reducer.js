import HttpRequest from '../../shared/httpRequest/HttpRequest';
import {Logger} from '../../shared/Log/Logger';
import { getOngByLocalStorage } from '../../shared/session/SessionService';

const logger = new Logger('CreateIncidentsPage.reducer.js');

export const ACTION_TYPES = {
    LOADING: 'createIncident/LOADING',
    SET_INCIDENT_SUCCESS:'createIncident/SET_INCIDENT_SUCCESS',
    SET_INCIDENT_FAIL: 'createIncident/SET_INCIDENT_FAIL'
}

const initialState = {
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOADING:
            return {...state, loading: true };
        case ACTION_TYPES.SET_INCIDENT_SUCCESS:
            return {...state, loading: false };
        case ACTION_TYPES.SET_INCIDENT_FAIL:
            return {...state, loading: false };
        default:
            return state;
    };
};

export const setNewIncident = (title, description, value) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    const ong = getOngByLocalStorage();
    try {
        logger.info(`Try to create a new incident with id: ${ong.id}`);
        const body = { title, description, value };
        const result = await HttpRequest.post('/incidents', body, {
            headers:{
                Authorization: ong.id
            }
        });
        logger.info(`New incident created with success.`);
        dispatch({ type: ACTION_TYPES.SET_INCIDENT_SUCCESS});
        alert('Caso cadastrado com sucesso ! Caso deseja cadastrar mais casos fique na page, se não, volte para home');
    } catch (e) {
        logger.error(`Fail to create a new incidents with id: ${ong.id}`);
        dispatch({ type: ACTION_TYPES.SET_INCIDENT_FAIL});
        alert('Falha ao cadastrar um novo caso ! Tente mais tarde');
    }
};