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

    const novaReceitaFixa = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: valor,
      Data: dataPagamento, 
      Descricao: descricao,
    }

    await database("Receita_Fixa").insert(novaReceitaFixa);
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

async function getAllReceitasFixas_Usuario_Servico(userId) {
  try {
    console.log(userId)
    return await database('Receita_Fixa').select('*').where('ID_Usuario', userId);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getReceitaFixaByIdServico(userId, receitaFixaId) {
  try {
    return await database('Receita_Fixa')
      .select("*")
      .where({ ID: receitaFixaId, ID_Usuario: userId })
      .first();
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function getAllReceitaFixaServico() {
    try {
      return await database('Receita_Fixa').select('*');
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  async function updateReceitaFixaServico(userId, receitaId, nome, valor, descricao, dataPagamento) {
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
  
      const receita = await database("Receita_Fixa").select('*').where("id",receitaId).first()
      if(!receita){
        throw new Error("Receita não encontrada");
      }
  
      if(usuario.ID !== receita.ID_Usuario){
        throw new Error("Receita não relacionada ao usuário");
      }
      
      const novaReceitaFixa = { 
        ID_Usuario : userId,
        Nome: nome,
        Valor: valor,
        Data: dataPagamento, 
        Descricao: descricao,
      }
  
      await database("Receita_Fixa").update(novaReceitaFixa).where("id",receitaId);
      return {
        status: true,
        message: `Informações da respeita ${receitaId} atualizadas com sucesso!`,
      };
    
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
  

async function deleteReceitaFixaServico(userId, receitaId) {
  try {

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const receita = await database("Receita_Fixa").select('*').where("id",receitaId).first()
    if(!receita){
      throw new Error("Receita não encontrada");
    }

    if(usuario.ID!==receita.ID_Usuario){
      throw new Error("Receita não relacionada ao usuário");
    }
    
    await database("Receita_Fixa").where("id",receitaId).delete();
    return {
      status: true,
      message: `Receita deletada com sucesso!`,
    };
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}


//RECEITAS VARIÁVEIS

module.exports = {
  //RECEITAS FIXAS
  
  createReceitaFixaServico,
  updateReceitaFixaServico,
  deleteReceitaFixaServico,
  getAllReceitaFixaServico,
  getAllReceitasFixas_Usuario_Servico,
  getReceitaFixaByIdServico,

  //RECEITAS VARIÁVEIS
  /*
  createReceitaVarServico,
  updateReceitaVarServico,
  deleteReceitaVarServico,
  getAllReceitaVarServico,
  getAllReceitaVar_Usuario_Servico,
  getReceitaVarByIdServico,*/
};
