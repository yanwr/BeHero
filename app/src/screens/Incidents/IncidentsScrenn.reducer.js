import HttpRequest from '../../shared/httpRequest/HttpRequest';

export const ACTION_TYPES = {
    LOADING: 'incident/LOADING'
};

const initialState = {
    loading: false,
    incidents: [],
    page: 0,
    totalItens: 0,
};

export default ({ state = initialState, action }) => {
    switch (action.type) {
        case ACTION_TYPES.LOADING:
            return { ...state, loading: true };
        default:
            state;
    }
};

export const loadIncidentsByPage = (page = 1, currentIncidents ) => async (dispatch, getState) =>{
    dispatch({ type: ACTION_TYPES.LOADING });
    try {
        const response = await HttpRequest.get(`/incidents?page=${page}`);
        
    } catch (error) {
        
    }
}