const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);

async function deletarUsuario(id) {
  try {
    const user = await database("Usuario").select("*").where({ ID: id });

    if (user.length === 0) {
      throw new Error("User not found!");
    }

    // Excluir registros relacionados em outras tabelas
    await database("Despesa_Fixa").where({ ID_Usuario: id }).delete();
    await database("Despesa_Variavel").where({ ID_Usuario: id }).delete();
    await database("Receita_Fixa").where({ ID_Usuario: id }).delete();
    await database("Receita_Variavel").where({ ID_Usuario: id }).delete();
    await database("Limite_Mensal").where({ ID_Usuario: id }).delete();
    await database("Balanco_Mensal").where({ ID_Usuario: id }).delete();
    await database("Relatorio_Mensal").where({ ID_Usuario: id }).delete();

    // Finalmente, excluir o usuário
    await database("Usuario").where({ ID: id }).delete();

    return {
      status: true,
      message: "Usuário deletado!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = { deletarUsuario};