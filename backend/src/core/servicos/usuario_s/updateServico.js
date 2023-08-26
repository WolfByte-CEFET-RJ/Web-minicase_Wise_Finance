const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);

module.exports = {
    async update(id, updatedUser){
        try {
            const usuario = await database("usuario").select("*").where("id", id).first();
    
            if (!usuario) {
              throw new Error("Usuário não encontrado!");
            }

            await database("usuario").update(updatedUser).where("id",id);
            
            return {
              status: true,
              message: "Informações atualizadas!",
            };
          } catch (error) {
            console.log(error);
            return {
              status: false,
              message: error["message"]
            };
          }
    }
}