const database = require('../../database/index');

async function createDespesaFixaServico(userId, nome, valor, descricao) {
  try {
    
    if (
      !nome ||
      !valor ||
      !descricao
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }
    
    const dataAtual = new Date();
    const novaDespesaFixa = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataAtual,
      Descricao: descricao,
    }

    await database("Despesa_Fixa").insert(novaDespesaFixa);
    return {
      status: true,
      message: `Despesa adicionada ao usuário ${userId}`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllDespesasFixas(userId) {
  try {
    return await knex('Despesa_Fixa').where('ID_Usuario', userId);
  } catch (error) {
    throw new Error('Erro ao buscar despesas fixas');
  }
}

async function getDespesaFixaById(userId, despesaFixaId) {
  try {
    return await knex('Despesa_Fixa')
      .where({ ID: despesaFixaId, ID_Usuario: userId })
      .first();
  } catch (error) {
    throw new Error('Erro ao buscar a despesa fixa');
  }
}

async function updateDespesaFixaServico(userId, despesaId, nome, valor, descricao) {
  try {
    
    if (
      !nome ||
      !valor ||
      !descricao
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const despesa = await database("Despesa_Fixa").select('*').where("id",despesaId).first()
    if(!despesa){
      throw new Error("Despesa não encontrada");
    }

    if(usuario.ID!==despesa.ID_Usuario){
      throw new Error("Despesa não relacionada ao usuário");
    }
    
    //data é sempre atualizada
    const dataAtual = new Date();
    const novaDespesaFixa = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataAtual,
      Descricao: descricao,
    }

    await database("Despesa_Fixa").update(novaDespesaFixa).where("id",despesaId);
    return {
      status: true,
      message: `Informações da despesa ${despesaId} atualizadas com sucesso!`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function deleteDespesaFixaServico(userId, despesaId) {
  try {

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const despesa = await database("Despesa_Fixa").select('*').where("id",despesaId).first()
    if(!despesa){
      throw new Error("Despesa não encontrada");
    }

    if(usuario.ID!==despesa.ID_Usuario){
      throw new Error("Despesa não relacionada ao usuário");
    }
    
    await database("Despesa_Fixa").where("id",despesaId).delete();
    return {
      status: true,
      message: `Despesa deleteda com sucesso!`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = {
  createDespesaFixaServico,
  updateDespesaFixaServico,
  deleteDespesaFixaServico
};
