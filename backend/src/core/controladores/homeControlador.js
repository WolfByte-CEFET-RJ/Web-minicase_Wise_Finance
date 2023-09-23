const { request, response } = require('express');
const { createDespesaFixaServico, updateDespesaFixaServico, deleteDespesaFixaServico, getAllDespesasFixas_Usuario_Servico, getDespesaFixaByIdServico, getAllDespesasFixasServico } = require('../servicos/homeServico');

async function createDespesaFixa(req, res) {
  const userId = req.params.id;
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
    const despesasFixas = await getAllDespesasFixasServico(userId); 
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
  const despesas = await getAllDespesasFixas_Usuario_Servico();
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

module.exports = {
  createDespesaFixa,
  getAllDespesasFixas,
  getAllDespesasFixas_Usuario,
  getDespesaFixaById,
  updateDespesaFixa,
  deleteDespesaFixa,
};
