const database = require('../../database/index');

//RECEITAS FIXAS

async function createReceitaFixaServico (userId, nome, valor, descricao, dataPagamento) {

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

//RECEITAS VARIÁVEIS

async function createReceitaVarServico (userId, nome, valor, descricao, dataPagamento) {
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

    const novaReceitaVar = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataPagamento, 
      Descricao: descricao,
    }

    await database("Receita_Variavel").insert(novaReceitaVar);
    return {
      status: true,
      message: `Receita adicionada ao usuário ${userId}`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllReceitaVar_Usuario_Servico(userId) {
  try {
    console.log(userId)
    return await database('Receita_Variavel').select('*').where('ID_Usuario', userId);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getReceitaVarByIdServico(userId, receitaVarId) {
  try {
    return await database('Receita_Variavel')
      .select("*")
      .where({ ID: receitaVarId, ID_Usuario: userId })
      .first();
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllReceitaVarServico() {
    try {
      return await database('Receita_Variavel').select('*');
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
}

  async function updateReceitaVarServico(userId, receitaId, nome, valor, descricao, dataPagamento) {
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
  
      const despesa = await database("Receita_Variavel").select('*').where("id",receitaId).first()
      if(!despesa){
        throw new Error("Receita não encontrada");
      }
  
      if(usuario.ID !== despesa.ID_Usuario){
        throw new Error("Receita não relacionada ao usuário");
      }
      
      const novaReceitaVar = { 
        ID_Usuario : userId,
        Nome: nome,
        Valor: valor,
        Data: dataPagamento, 
        Descricao: descricao,
      }
  
      await database("Receita_Variavel").update(novaReceitaVar).where("id",receitaId);
      return {
        status: true,
        message: `Informações da despesa ${receitaId} atualizadas com sucesso!`,
      };
    
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
}
  
async function deleteReceitaVarServico(userId, receitaId) {
  try {

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const despesa = await database("Receita_Variavel").select('*').where("id",receitaId).first()
    if(!despesa){
      throw new Error("Receita não encontrada");
    }

    if(usuario.ID!==despesa.ID_Usuario){
      throw new Error("Receita não relacionada ao usuário");
    }
    
    await database("Receita_Variavel").where("id",receitaId).delete();
    return {
      status: true,
      message: `Receita deleteda com sucesso!`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = {
  //RECEITAS FIXAS
  /*
  createReceitaFixaServico,
  updateReceitaFixaServico,
  deleteReceitaFixaServico,
  getAllReceitaFixaServico,
  getAllReceitaFixa_Usuario_Servico,
  getReceitaFixaByIdServico,
  */
  //RECEITAS VARIÁVEIS
  createReceitaVarServico,
  updateReceitaVarServico,
  deleteReceitaVarServico,
  getAllReceitaVarServico,
  getAllReceitaVar_Usuario_Servico,
  getReceitaVarByIdServico,
};
