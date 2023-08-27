const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);
const bcrypt = require('bcrypt');

/*async function HashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}*/

    async function update(id, nome, username){
        try {
            const usuario = await database("usuario")
            .select("*")
            .where("id", id)
            .first();
            
            if (!usuario) {
              throw new Error("Usuário não encontrado!");
            }

            //EM CASO DE async function update(id, nome, username, email, senha, senhaConfirmacao)
            /*if (senha.length < 4) {
              throw new Error("Senha muito curta!");
            }
        
            if (senha !== senhaConfirmacao) {
              throw new Error("As senhas precisam ser iguais.");
            }
        
            const userEmail = await database("Usuario")
              .select("*")
              .where({ Email: email })
              .first();
            if (userEmail) {
              throw new Error("Endereço de e-mail já cadastrado!");
            }

            const hash = await HashPassword(senha);
            */
            const updatedUser = {
              nome: nome,
              username: username
            }

            await database("usuario")
            .update(updatedUser)
            .where("id",id);
            
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
    
  module.exports = { update }