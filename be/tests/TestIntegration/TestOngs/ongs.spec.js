const request = require('supertest');
const app = require('../../../src/app');
const Connection = require('../../../src/database/Connection');

describe('ONG', () => {
    beforeEach( async () => {
        await Connection.migrate.rollback();// zerar primeiro o banco 
        await Connection.migrate.latest();
    });
    
    afterAll( async () => {
        await Connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "TESTE",
                email: "teste@gmail.com",
                whatsapp: "48 996894386",
                city: "Floripa-Teste",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });


});