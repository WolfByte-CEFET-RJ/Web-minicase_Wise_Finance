const { request, response } = require('express');
const database = require('../../database/index');
const { createDespesaFixaServico, updateDespesaFixaServico, deleteDespesaFixaServico, getAllDespesasFixas_Usuario_Servico, getDespesaFixaByIdServico, getAllDespesasFixasServico, 
        createDespesaVarServico, updateDespesaVarServico, deleteDespesaVarServico, getAllDespesaVar_Usuario_Servico, getDespesaVarByIdServico, getAllDespesaVarServico,  
      } = require('../servicos/despesasServico');

//DESPESAS FIXAS
async function createDespesaFixa(req, res,next) {
  const userId = req.usuario.id;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaFixaServico(userId, nome, valor, descricao, dataPagamento); 

    res.json(create);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDespesasFixas_Usuario(req, res) {
  const userId = req.usuario.id;
  try {
    const despesasFixas = await getAllDespesasFixas_Usuario_Servico(userId); 
    res.json(despesasFixas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDespesaFixaById(req, res) {
  const userId = req.usuario.id;
  const despesaFixaId = req.params.id_desp;

  try {
    const despesaFixa = await getDespesaFixaByIdServico(userId, despesaFixaId);

    if (!despesaFixa) {
      return res.status(404).json({ error: 'Despesa fixa não encontrada' });
    }

    res.json(despesaFixa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDespesasFixas(req, res) {
try {
  const despesas = await getAllDespesasFixasServico();
  res.json(despesas);
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

async function updateDespesaFixa(req, res,next) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  const {
    nome,
    valor,
    descricao,
    dataPagamento,
  } = req.body;

  try {
    const update = await updateDespesaFixaServico(userId, despesaId, nome, valor, descricao, dataPagamento);

    res.json(update);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDespesaFixa(req, res, next) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaFixaServico(userId, despesaId);
    res.json(deletar);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//DESPESAS VARIÁVEIS
async function getAllDespesasVar_Usuario(req, res) {
  const userId = req.usuario.id;
  console.log(userId)
  try {
    const despesasVariaveis = await getAllDespesaVar_Usuario_Servico(userId); 
    res.json(despesasVariaveis);
  } catch (error) {
  return {
    status: false,
    message: error.message,
  };
}
}

async function createDespesaVar(req, res, next){
  const userId = req.usuario.id;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaVarServico(userId, nome, valor, descricao, dataPagamento); 

    res.json(create);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDespesasVarById(req, res) {
  const userId = req.usuario.id;
  const despesaVariavelId = req.params.id_desp;

  try {
    const despesaVariavel = await  getDespesaVarByIdServico(userId, despesaVariavelId);

    if (!despesaVariavel) {
      return res.status(404).json({ error: 'Despesa variável não encontrada' });
    }

    res.json(despesaVariavel);
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function updateDespesaVar(req, res, next) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  const {
    nome,
    valor,
    descricao,
    dataPagamento,
  } = req.body;

  try {
    const update = await updateDespesaVarServico(userId, despesaId, nome, valor, descricao, dataPagamento);

    res.json(update);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDespesasVar(req, res) {
try {
  const despesas = await getAllDespesaVarServico();
  res.json(despesas);
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

async function deleteDespesaVar(req, res, next) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaVarServico(userId, despesaId);
    res.json(deletar);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//VERIFICA LIMITE
async function verificaLimite(req, res) {
  const userId = req.usuario.id;

  try {
    const [totalFixaResult, totalVarResult, limite] = await Promise.all([
      database("Despesa_Fixa").sum("Valor as Tot_Desp_Fixa").where("id_usuario", userId).first(),
      database("Despesa_Variavel").sum("Valor as Tot_Desp_Var").where("id_usuario", userId).first(),
      database("limite_mensal").select("Valor_Limite").where("id_usuario", userId).first()
    ]);

    const totalFixa = parseFloat(totalFixaResult.Tot_Desp_Fixa) || 0;
    const totalVar = parseFloat(totalVarResult.Tot_Desp_Var) || 0;

    const soma = totalFixa + totalVar;

    if (soma > parseFloat(limite.Valor_Limite)) {
      console.log("NOTIFY: VALOR DO LIMITE ULTRAPASSADO");
    } else{
      console.log("NOTIFY: DENTRO DO LIMITE")
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  //LIMITE
  verificaLimite,

  //DESPESA FIXA
  createDespesaFixa,
  getAllDespesasFixas,
  getAllDespesasFixas_Usuario,
  getDespesaFixaById,
  updateDespesaFixa,
  deleteDespesaFixa,

  //DESPESA VARIÁVEL
  createDespesaVar,
  getAllDespesasVar,
  getAllDespesasVar_Usuario,
  getDespesasVarById,
  updateDespesaVar,
  deleteDespesaVar,
};
