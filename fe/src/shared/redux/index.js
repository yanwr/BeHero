import { combineReducers } from 'redux';

import sessionState from '../session/Session.reducer';
import incidentState from '../../pages/Incidents/IncidentsPage.reducer';
import createIncidentState from '../../pages/CreateIncident/CreateIncidentsPage.reducer';
import registerState from '../../pages/Register/RegisterPage.reducer';

const appReducer = combineReducers({
    sessionState,
    incidentState,
    createIncidentState,
    registerState
});

const routerReducer = (state, action) => {
    return appReducer(state, action);
};

export default routerReducer;