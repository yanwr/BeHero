import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import IncidentsPage from './pages/Incidents/IncidentsPage';
import NewIncidentsPage from './pages/NewIncidents/NewIncidentsPage';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/incidents" exact component={IncidentsPage} />
                <Route path="/incidents/new" exact component={NewIncidentsPage} />
            </Switch>
        </BrowserRouter>
    );
}
