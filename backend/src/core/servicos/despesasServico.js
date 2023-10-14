const database = require('../../database/index');
const { verificaLimite } = require("./limiteService")

//DESPESAS FIXAS

async function getTotalDespesasFixas(userId) {
  try {

    const despesasFixas = await database('Despesa_Fixa').select('Valor').where('ID_Usuario', userId);
    let totalFixas = 0;

    for (const despesa of despesasFixas) {
      totalFixas += parseFloat(despesa.Valor);
    }

    return totalFixas;
  } catch (error) {
    throw new Error("Erro ao calcular o total de despesas fixas");
  }
}

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

async function getTotalDespesasVariaveis(userId) {
  try {

    const despesasVariaveis = await database('Despesa_Variavel').select('Valor').where('ID_Usuario', userId);
    let totalVariaveis = 0;

    for (const despesa of despesasVariaveis) {
      totalVariaveis += parseFloat(despesa.Valor);
    }

    return totalVariaveis;
  } catch (error) {
    throw new Error("Erro ao calcular o total de despesas variáveis");
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

async function updateDespesaTotais(userId) {
  try {
    const totalDespesasVariaveis = await getTotalDespesasVariaveis(userId);
    const totalDespesasFixas = await getTotalDespesasFixas(userId);

    await database('Usuario')
      .where('ID', userId)
      .update({
        Desp_Var_Total: totalDespesasVariaveis,
        Desp_Fixa_Total: totalDespesasFixas,
      });

    return {
      status: true,
      message: 'Totais de despesas atualizados com sucesso!',
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = {
  //DESPESAS FIXAS
  createDespesaFixaServico,
  updateDespesaFixaServico,
  deleteDespesaFixaServico,
  getAllDespesasFixas_Usuario_Servico,
  getDespesaFixaByIdServico,
  getTotalDespesasFixas,

  //DESPESAS VARIÁVEIS
  createDespesaVarServico,
  updateDespesaVarServico,
  deleteDespesaVarServico,
  getAllDespesaVar_Usuario_Servico,
  getDespesaVarByIdServico,
  getTotalDespesasVariaveis,
  updateDespesaTotais,

};
