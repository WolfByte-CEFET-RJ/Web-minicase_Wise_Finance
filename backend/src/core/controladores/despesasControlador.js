const { request, response } = require('express');
const database = require('../../database/index');
const { createDespesaFixaServico, updateDespesaFixaServico, deleteDespesaFixaServico, getAllDespesasFixas_Usuario_Servico, getDespesaFixaByIdServico,  
        createDespesaVarServico, updateDespesaVarServico, deleteDespesaVarServico, getAllDespesaVar_Usuario_Servico, getDespesaVarByIdServico, updateDespesaTotais,
      } = require('../servicos/despesasServico');
const {calcularSaldoGeral } = require('../servicos/saldoGeralServico');

//DESPESAS FIXAS
async function createDespesaFixa(req, res) {
  const userId = req.usuario.id;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaFixaServico(userId, nome, valor, descricao, dataPagamento);
    await updateDespesaTotais(userId); 
    await calcularSaldoGeral(userId, valor, false);

    res.json(create);
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


async function updateDespesaFixa(req, res) {
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
    await updateDespesaTotais(userId);
    await calcularSaldoGeral(userId, valor, false);
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDespesaFixa(req, res) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaFixaServico(userId, despesaId);
    await updateDespesaTotais(userId);
    await calcularSaldoGeral(userId, valor, false);
    res.json(deletar);
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

async function createDespesaVar(req, res){
  const userId = req.usuario.id;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createDespesaVarServico(userId, nome, valor, descricao, dataPagamento); 
    await updateDespesaTotais(userId);
    await calcularSaldoGeral(userId, valor, false);
    res.json(create);
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

async function updateDespesaVar(req, res) {
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
    await updateDespesaTotais(userId);
    await calcularSaldoGeral(userId, valor, false);

    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDespesaVar(req, res) {
  const userId = req.usuario.id;
  const despesaId = req.params.id_desp;

  try {
    const deletar = await deleteDespesaVarServico(userId, despesaId);
    await updateDespesaTotais(userId);
    await calcularSaldoGeral(userId, valor, false);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {

  //DESPESA FIXA
  createDespesaFixa,
  getAllDespesasFixas_Usuario,
  getDespesaFixaById,
  updateDespesaFixa,
  deleteDespesaFixa,

  //DESPESA VARIÁVEL
  createDespesaVar,
  getAllDespesasVar_Usuario,
  getDespesasVarById,
  updateDespesaVar,
  deleteDespesaVar,
};
