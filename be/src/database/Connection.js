const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.DB_CONFIG === 'test' ? configuration.test : configuration.development;
const connection = knex(config);

module.exports = connection;