const database = require('../../database/index');
const { verificaLimite } = require("./limiteService")

//DESPESAS FIXAS

async function createDespesaFixaServico(userId, nome, valor, descricao, dataPagamento) {

  try {
    
    if (
      !nome ||
      !valor ||
      !descricao ||
      !dataPagamento
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const novaDespesaFixa = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataPagamento, 
      Descricao: descricao,
    }

    await database("Despesa_Fixa").insert(novaDespesaFixa);
    return {
      status: true,
      message: `Despesa adicionada ao usuário ${userId}`,
      limite: await verificaLimite(userId)
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllDespesasFixas_Usuario_Servico(userId) {
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

async function getAllDespesasFixasServico() {
    try {
      return await database('Despesa_Fixa').select('*');
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

async function updateDespesaFixaServico(userId, despesaId, nome, valor, descricao, dataPagamento) {
    try {
      
      if (
        !nome ||
        !valor ||
        !descricao ||
        !dataPagamento
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
  
      if(usuario.ID !== despesa.ID_Usuario){
        throw new Error("Despesa não relacionada ao usuário");
      }
      
      const novaDespesaFixa = { 
        ID_Usuario : userId,
        Nome: nome,
        Valor: valor,
        Data: dataPagamento, 
        Descricao: descricao,
      }
  
      await database("Despesa_Fixa").update(novaDespesaFixa).where("id",despesaId);
      return {
        status: true,
        message: `Informações da despesa ${despesaId} atualizadas com sucesso!`,
        limite: await verificaLimite(userId)
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
      limite: await verificaLimite(userId)
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

//DESPESAS VARIÁVEIS


async function getAllDespesaVarServico() {
  try {
    return await database('Despesa_Variavel').select('*');
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function createDespesaVarServico(userId, nome, valor, descricao, dataPagamento) {
  try {
    
    if (
      !nome ||
      !valor ||
      !descricao ||
      !dataPagamento
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const novaDespesaVar = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataPagamento, 
      Descricao: descricao,
    }

    await database("Despesa_Variavel").insert(novaDespesaVar);
    return {
      status: true,
      message: `Despesa adicionada ao usuário ${userId}`,
      limite: await verificaLimite(userId)
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getDespesaVarByIdServico(userId, despesaVariavelId) {
  try {
    return await database('Despesa_Variavel')
      .select("*")
      .where({ ID: despesaVariavelId, ID_Usuario: userId })
      .first();
    } catch (error) {
      return {
        status: false,
        message: error.message,
    };
  }
}

async function updateDespesaVarServico(userId, despesaId, nome, valor, descricao, dataPagamento) {
  try {
    
    if (
      !nome ||
      !valor ||
      !descricao ||
      !dataPagamento
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const despesa = await database("Despesa_Variavel").select('*').where("id",despesaId).first()
    if(!despesa){
      throw new Error("Despesa não encontrada");
    }

    if(usuario.ID !== despesa.ID_Usuario){
      throw new Error("Despesa não relacionada ao usuário");
    }
    
    const novaDespesaVar = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataPagamento, 
      Descricao: descricao,
    }

    await database("Despesa_Variavel").update(novaDespesaVar).where("id",despesaId);
    return {
      status: true,
      message: `Informações da despesa ${despesaId} atualizadas com sucesso!`,
      limite: await verificaLimite(userId)
    };

  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}


async function getAllDespesaVar_Usuario_Servico(userId) {
  try {
    return await database('Despesa_Variavel').select('*').where('ID_Usuario', userId);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  }

async function deleteDespesaVarServico(userId, despesaId) {
  try {

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const despesa = await database("Despesa_Variavel").select('*').where("id",despesaId).first()
    if(!despesa){
      throw new Error("Despesa não encontrada");
    }

    if(usuario.ID!==despesa.ID_Usuario){
      throw new Error("Despesa não relacionada ao usuário");
    }
    
    await database("Despesa_Variavel").where("id",despesaId).delete();
    return {
      status: true,
      message: `Despesa deleteda com sucesso!`,
      limite: await verificaLimite(userId)
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}


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
