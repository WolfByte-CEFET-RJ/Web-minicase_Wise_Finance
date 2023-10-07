const database = require('../../database/index');

async function define(id_user, valor){
    try {
        const usuario = await database("usuario")
        .select("*")
        .where("id", id_user)
        .first();
        
        if (!usuario) {
          throw new Error("Usuário não encontrado!");
        }

        const verificaExistenciaDoLimite = await database("limite_mensal")
        .select("*")
        .where("id_usuario", id_user)
        .first();
        
        if (!verificaExistenciaDoLimite) {
          throw new Error("Limite não definido!");
        }

        const data = new Date();
        const [mesAtual, anoAtual] = [data.getMonth() + 1, data.getFullYear()];

        const limite = {
            ID_Usuario: id_user,
            Valor_Limite: valor,
            Mes_Definido: mesAtual,
            Ano_Definido: anoAtual,
        };

        await database("Limite_Mensal").update(limite).where("id_usuario",id_user);
    
      return {
        status: true,
        message: `Limite de R$${valor} definido ao usuario ${id_user}`,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
   }
}
  
  module.exports = { 
      define,
};