const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);

module.exports = {
    async readAll(req,res){
        try { 
            const lista = await database('usuario').select("*");
            return res.json(lista);
        } catch (error) {
            return res.json(error);
        }
    }
}