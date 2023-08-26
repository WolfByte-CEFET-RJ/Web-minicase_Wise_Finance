const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);

async function readAll(){
    try { 
    const lista = await database('usuario').select("*");
        if(lista.length==0){
            throw new Error("Usuários não encontrados");
        }
        return {
            status: true,
            lista
        }
    } catch (error) {
        return {
            status: false,
            message: error["message"]
        };
    }
}

async function readOne(id){
    try { 
        const usuario = await database('usuario').select("*").where("id",id).first();
        if(usuario==null){
            throw new Error("Usuário não encontrado");
        }
        return {
            status: true,
            usuario
        };
    } catch (error) {
        return {
            status: false,
            message: error["message"]
        };
    }
}

module.exports = {
    readAll,
    readOne
}