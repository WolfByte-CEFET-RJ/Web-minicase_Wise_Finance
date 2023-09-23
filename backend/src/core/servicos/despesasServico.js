const database = require('../../database/index');

//DESPESAS FIXAS
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

async function getAllDespesasFixasServico(userId) {
  try {
    console.log(userId)
    return await database('Despesa_Fixa').select('*').where('ID_Usuario', userId);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getDespesaFixaByIdServico(userId, despesaFixaId) {
  try {
    return await database('Despesa_Fixa')
      .select("*")
      .where({ ID: despesaFixaId, ID_Usuario: userId })
      .first();
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllDespesasFixas_Usuario_Servico() {
    try {
      return await database('Despesa_Fixa').select('*');
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
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

//DESPESAS VARIÁVEIS


module.exports = {
  //DISPESAS FIXAS
  createDespesaFixaServico,
  updateDespesaFixaServico,
  deleteDespesaFixaServico,
  getAllDespesasFixasServico,
  getAllDespesasFixas_Usuario_Servico,
  getDespesaFixaByIdServico,
  //DESPESAS VARIÁVEIS
  createDespesaVarServico,
  updateDespesaVarServico,
  deleteDespesaVarServico,
  getAllDespesaVarServico,
  getAllDespesaVar_Usuario_Servico,
  getDespesaVarByIdServico,
};
