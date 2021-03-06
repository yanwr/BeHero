const Connection = require('../../database/Connection'); 
const generateUniqueId = require('../../utils/User/generateUniqueId');

module.exports = {
    async store(request, response){
        const { name, email, whatsapp, uf, city} = request.body;
        const id = generateUniqueId();

        String.prototype.isNumberValid = function(index, string) {
            if (this.indexOf('+55') != -1 || this.indexOf('55')  != -1 )
            {
              return this;
            }
            return string + this;
          };

        let wpp = whatsapp;
          

        await Connection('ongs').insert({
            id, 
            name, 
            email, 
            'whatsapp': wpp.isNumberValid(0, '+55 '),
            city,
            uf, 
        });
        return response.json({ id });
    },

    async index ( request, response ){
        const ongs = await Connection('ongs').select('*');
        return response.json({ ongs });
    }
}