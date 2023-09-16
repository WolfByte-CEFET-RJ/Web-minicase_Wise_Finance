const { request, response } = require('express');
const { createDespesaFixa, getAllDespesasFixas, getDespesaFixaById,  updateDespesaFixa, deleteDespesaFixa } = require('../servicos/homeServico');

async function createDespesaFixa(req, res) {
  const userId = req.user.id;
  const despesaFixaData = req.body;

  try {
    const result = await DespesaFixaService.createDespesaFixa(userId, despesaFixaData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDespesasFixas(req, res) {
  const userId = req.user.id;

  try {
    const despesasFixas = await DespesaFixaService.getAllDespesasFixas(userId);
    res.json(despesasFixas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getDespesaFixaById(req, res) {
  const userId = req.user.id;
  const despesaFixaId = req.params.id;

  try {
    const despesaFixa = await DespesaFixaService.getDespesaFixaById(userId, despesaFixaId);

    if (!despesaFixa) {
      return res.status(404).json({ error: 'Despesa fixa não encontrada' });
    }

    res.json(despesaFixa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDespesaFixa(req, res) {
  const userId = req.user.id;
  const despesaFixaId = req.params.id;
  const despesaFixaData = req.body;

  try {
    const result = await DespesaFixaService.updateDespesaFixa(userId, despesaFixaId, despesaFixaData);

    if (result === 0) {
      return res.status(404).json({ error: 'Despesa fixa não encontrada' });
    }

    res.json({ message: 'Despesa fixa atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDespesaFixa(req, res) {
  const userId = req.user.id;
  const despesaFixaId = req.params.id;

  try {
    const result = await DespesaFixaService.deleteDespesaFixa(userId, despesaFixaId);

    if (result === 0) {
      return res.status(404).json({ error: 'Despesa fixa não encontrada' });
    }

    res.json({ message: 'Despesa fixa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createDespesaFixa,
  getAllDespesasFixas,
  getDespesaFixaById,
  updateDespesaFixa,
  deleteDespesaFixa,
};
