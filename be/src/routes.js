const express = require('express');
const routes = express.Router();

const OngController = require('./controllers/OngsController/OngController');

const IncidentController = require('./controllers/IncidentsController/InsidentController');
const ProfileController = require('./controllers/IncidentsController/ProfileController');
const LoginSessionController = require('./controllers/SessionsController/LoginController');

routes.post('/login', LoginSessionController.store);

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.store);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/profile', ProfileController.index);

module.exports = routes;