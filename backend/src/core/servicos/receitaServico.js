const database = require('../../database/index');
const Joi = require('joi');

function validaReceita(nome, valor, descricao, dataPagamento) {
  const schema = Joi.object({
    nome: Joi.string().alphanum().required(),
    valor: Joi.number().required(),
    descricao: Joi.string().required(),
    dataPagamento: Joi.date().iso().required(),
  });

  const receita = { nome, valor, descricao, dataPagamento };
  return schema.validate(receita, { abortEarly: false }  );
}
//RECEITAS FIXAS

async function getTotalReceitasFixas(userId) {
  try {
    
    const receitasFixas = await database('Receita_Fixa').select('Valor').where('ID_Usuario', userId);
    let totalReceitasFixas = 0;

    for (const receita of receitasFixas) {
      totalReceitasFixas += parseFloat(receita.Valor);
    }

    return totalReceitasFixas;
  } catch (error) {
    throw new Error("Erro ao calcular o total de receitas fixas");
  }
}

async function createReceitaFixaServico (userId, nome, valor, descricao, dataPagamento) {

  try {
    
    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const { error } = validaReceita(nome, valor, descricao, dataPagamento);
    if (error) {
      const customErrors = error.details.map(err => err.message);
      return {
        status: false,
        message: customErrors,
      };
    }

    const novaReceitaFixa = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: parseFloat(valor),
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

async function updateReceitaFixaServico(userId, receitaId, nome, valor, descricao, dataPagamento) {
    try {
      
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
      
      const { error } = validaReceita(nome, valor, descricao, dataPagamento);
      if (error) {
        const customErrors = error.details.map(err => err.message);
        return {
          status: false,
          message: customErrors,
        };
      }

      const novaReceitaFixa = { 
        ID_Usuario : userId,
        Nome: nome,
        Valor: parseFloat(valor),
        Data: dataPagamento, 
        Descricao: descricao,
      }
  
      await database("Receita_Fixa").update(novaReceitaFixa).where("id",receitaId);
      return {
        status: true,
        message: `Informações da receita ${receitaId} atualizadas com sucesso!`,
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

async function getTotalReceitasVariaveis(userId) {
  try {
  
    const receitasVariaveis = await database('Receita_Variavel').select('Valor').where('ID_Usuario', userId);
    let totalReceitasVariaveis = 0;

    for (const receita of receitasVariaveis) {
      totalReceitasVariaveis += parseFloat(receita.Valor);
    }

    return totalReceitasVariaveis;
  } catch (error) {
    throw new Error("Erro ao calcular o total de receitas variáveis");
  }
}

async function createReceitaVarServico (userId, nome, valor, descricao, dataPagamento) {
  try {

    const usuario = await database("Usuario").select('*').where("id",userId).first()
    if(!usuario){
      throw new Error("Usuário não encontrado");
    }

    const { error } = validaReceita(nome, valor, descricao, dataPagamento);
    if (error) {
      const customErrors = error.details.map(err => err.message);
      return {
        status: false,
        message: customErrors,
      };
    }

    const novaReceitaVar = { 
      ID_Usuario : userId,
      Nome: nome,
      Valor: parseFloat(valor),
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

async function updateReceitaVarServico(userId, receitaId, nome, valor, descricao, dataPagamento) {
    try {
      
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
      
      const { error } = validaReceita(nome, valor, descricao, dataPagamento);
      if (error) {
        const customErrors = error.details.map(err => err.message);
        return {
          status: false,
          message: customErrors,
        };
      }

      const novaReceitaVar = { 
        ID_Usuario : userId,
        Nome: nome,
        Valor: parseFloat(valor),
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

//SOMATORIO DAS RECEITAS
async function updateReceitasTotais(userId) {
  try {
    const totalReceitasVariaveis = await getTotalReceitasVariaveis(userId);
    const totalReceitasFixas = await getTotalReceitasFixas(userId);

    await database('Usuario')
      .where('ID', userId)
      .update({
        Rec_Var_Total: totalReceitasVariaveis,
        Rec_Fixa_Total: totalReceitasFixas,
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
  //RECEITAS FIXAS
  createReceitaFixaServico,
  updateReceitaFixaServico,
  deleteReceitaFixaServico,
  getAllReceitasFixas_Usuario_Servico,
  getReceitaFixaByIdServico,
  getTotalReceitasFixas,

  //RECEITAS VARIÁVEIS
  createReceitaVarServico,
  updateReceitaVarServico,
  deleteReceitaVarServico,
  getAllReceitaVar_Usuario_Servico,
  getReceitaVarByIdServico,
  getTotalReceitasVariaveis,

  //SOMATORIO DAS RECEITAS
  updateReceitasTotais,
};