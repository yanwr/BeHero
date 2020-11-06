import { combineReducers } from 'redux';

import incidentsState from '../../screens/Incidents/IncidentsScrenn.reducer';

const appReducer = combineReducers({
    incidentsState,
});

const routerReducer = (state, action) => {
    return appReducer(state, action);
}

export default routerReducer;