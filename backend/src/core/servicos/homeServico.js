const database = require('../../database/index');

async function createDespesaFixa(userId, despesaFixaData) {
  try {
    return await knex('Despesa_Fixa').insert({
      ID_Usuario: userId,
      ...despesaFixaData,
    });
  } catch (error) {
    throw new Error('Erro ao criar a despesa fixa');
  }
}

async function getAllDespesasFixas(userId) {
  try {
    return await knex('Despesa_Fixa').where('ID_Usuario', userId);
  } catch (error) {
    throw new Error('Erro ao buscar despesas fixas');
  }
}

async function getDespesaFixaById(userId, despesaFixaId) {
  try {
    return await knex('Despesa_Fixa')
      .where({ ID: despesaFixaId, ID_Usuario: userId })
      .first();
  } catch (error) {
    throw new Error('Erro ao buscar a despesa fixa');
  }
}

async function updateDespesaFixa(userId, despesaFixaId, despesaFixaData) {
  try {
    return await knex('Despesa_Fixa')
      .where({ ID: despesaFixaId, ID_Usuario: userId })
      .update(despesaFixaData);
  } catch (error) {
    throw new Error('Erro ao atualizar a despesa fixa');
  }
}

async function deleteDespesaFixa(userId, despesaFixaId) {
  try {
    return await knex('Despesa_Fixa')
      .where({ ID: despesaFixaId, ID_Usuario: userId })
      .delete();
  } catch (error) {
    throw new Error('Erro ao excluir a despesa fixa');
  }
}

module.exports = {
  createDespesaFixa,
  getAllDespesasFixas,
  getDespesaFixaById,
  updateDespesaFixa,
  deleteDespesaFixa,
};
