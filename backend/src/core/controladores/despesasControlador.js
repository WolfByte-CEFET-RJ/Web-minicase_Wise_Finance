const { request, response } = require('express');
const { createDespesaFixaServico, updateDespesaFixaServico, deleteDespesaFixaServico, getAllDespesasFixas_Usuario_Servico, getDespesaFixaByIdServico, getAllDespesasFixasServico, 
        createDespesaVarServico, updateDespesaVarServico, deleteDespesaVarServico, getAllDespesaVar_Usuario_Servico, getDespesaVarByIdServico, getAllDespesaVarServico,  
      } = require('../servicos/despesasServico');

//DESPESAS FIXAS
async function createDespesaFixa(req, res) {
  const userId = req.params.id_user;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaFixaServico(userId, nome, valor, descricao, dataPagamento); 

    res.json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDespesasFixas_Usuario(req, res) {
  const userId = req.params.id_user;
  console.log(userId)
  try {
    const despesasFixas = await getAllDespesasFixas_Usuario_Servico(userId); 
    res.json(despesasFixas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDespesaFixaById(req, res) {
  const userId = req.params.id_user;
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

async function updateDespesaFixa(req, res) {
  const userId = req.params.id_user;
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDespesaFixa(req, res) {
  const userId = req.params.id_user;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaFixaServico(userId, despesaId);
    res.json(deletar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//DESPESAS VARIÁVEIS


async function getAllDespesasVar_Usuario(req, res) {
  const userId = req.params.id_user;
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

async function createDespesaVar(req, res){
  const userId = req.params.id_user;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaVarServico(userId, nome, valor, descricao, dataPagamento); 

    res.json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getDespesasVarById(req, res) {
  const userId = req.params.id_user;
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

async function updateDespesaVar(req, res) {
  const userId = req.params.id_user;
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

async function deleteDespesaVar(req, res) {
  const userId = req.params.id_user;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaVarServico(userId, despesaId);
    res.json(deletar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
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
