const database = require('../../database/index');

async function readByUsuario(id_user, mes, ano){
  try {

    const balanco = await database("Balanco_Mensal")
      .select('*')
      .where("id_usuario", id_user)
      .andWhere("Mes", mes)
      .andWhere("Ano", ano)
      .first();

    if(balanco==null){
      throw new Error("Balanço não encontrado.");
    }

    return {
      status: true,
      balanco
    };

  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
 }
}
  
module.exports = { 
      readByUsuario,
};