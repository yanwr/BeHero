import HttpRequest from '../../shared/httpRequest/HttpRequest';
import { Logger } from '../../shared/Log/Logger';
import { getOngByLocalStorage } from '../../shared/session/SessionService';

const logger = new Logger('IncidentsPage.reducer.js');

export const ACTION_TYPES = {
    LOADING: 'incidents/LOADING',
    GET_DATA_INCIDENST_SUCCESS: 'incidents/GET_DATA_INCIDENST_SUCCESS',
    GET_DATA_INCIDENST_FAIL: 'incidents/GET_DATA_INCIDENST_FAIL',
    DELETE_ITEM_SUCCESS: 'incidents/DELETE_ITEM_SUCCESS',
    DELETE_ITEM_FAIL: 'incident/DELETE_ITEM_FAIL',
};

const initialState = {
    loadingIncidents: false,
    incidents: [],
    ong: {}
};

export default (state = initialState, action ) => {
    switch (action.type) {
        case ACTION_TYPES.LOADING:
            return {...state, loadingIncidents: true };
        case ACTION_TYPES.GET_DATA_INCIDENST_SUCCESS:
            return {
                ...state, 
                loadingIncidents: false, 
                incidents: action.payload.incidents,
                ong: action.payload.ong 
            };
        case ACTION_TYPES.GET_DATA_INCIDENST_FAIL:
            return {...state, loadingIncidents: false};
        case ACTION_TYPES.DELETE_ITEM_SUCCESS:
            const incidents = state.incidents || [];
            const currentItem = action.payload;
            const newIncidents = incidents.filter( y => y.id !== currentItem);
            return {
                ...state,
                loadingIncidents: false,
                incidents: newIncidents
            };
        case ACTION_TYPES.DELETE_ITEM_FAIL:
            return {...state, loadingIncidents: false};
        default:
            return state;
    }
};

export const getIncidentsList = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    const ong  = getOngByLocalStorage();
    console.log('-------------------- ong', ong);
    try {
        logger.info(`Try to get profile/incident. Id: ${ong.id}.`);
        const { data } = await HttpRequest.get('profile', { 
            headers: {
                Authorization: ong.id 
            }
        });
        const incidents = data.incidents;
        logger.info(`Data profile/incident: ${data.incidents}`);
        dispatch({
            type: ACTION_TYPES.GET_DATA_INCIDENST_SUCCESS,
            payload: { incidents, ong }
        });
    } catch (e) {
        logger.error(`Fail to get datas from profile/inscitens. Id: ${ong.id}`);
        alert('Falha ao carregar os itens.');
        dispatch({ type: ACTION_TYPES.GET_DATA_INCIDENST_FAIL });
    }
};

export const deleteAnItem = (idItem) => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING });
    const ong  = getOngByLocalStorage();
    try {
        logger.info(`Try to delete item ${idItem}.`);
        const result =  await HttpRequest.delete(`/incidents/${idItem}`, { 
            headers: {
                Authorization: ong.id
            }
        });
        logger.info(`Item deleted with success.`);
        dispatch({ 
            type: ACTION_TYPES.DELETE_ITEM_SUCCESS,
            payload: idItem
        });
    } catch (e) {
        logger.error(`Fail to delete item ${idItem}.`);
        alert('Falha ao deletar o item selecionado.');
        dispatch({ type: ACTION_TYPES.DELETE_ITEM_FAIL });
    }
}