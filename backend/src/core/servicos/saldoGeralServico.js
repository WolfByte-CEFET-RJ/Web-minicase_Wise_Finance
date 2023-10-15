const receitaServico = require('./receitaServico');
const despesaServico = require('./despesasServico');
const database = require('../../database/index');

async function calcularSaldoGeral(userId) {
  try {
    const totalReceitasVariaveis = await receitaServico.getTotalReceitasVariaveis(userId);
    const totalReceitasFixas = await receitaServico.getTotalReceitasFixas(userId);
    const totalDespesasVariaveis = await despesaServico.getTotalDespesasVariaveis(userId);
    const totalDespesasFixas = await despesaServico.getTotalDespesasFixas(userId);

    const saldoGeral = totalReceitasVariaveis + totalReceitasFixas - totalDespesasVariaveis - totalDespesasFixas;

    await atualizarSaldoGeralNoBanco(userId, saldoGeral);

    return saldoGeral;
  } catch (error) {
    throw new Error('Erro ao calcular saldo geral: ' + error.message);
  }
}

async function atualizarSaldoGeralNoBanco(userId, saldoGeral) {
  try {
    await database('Usuario')
      .where('ID', userId)
      .update({
        Saldo_Geral: saldoGeral,
      });
  } catch (error) {
    throw new Error('Erro ao atualizar saldo geral no banco de dados: ' + error.message);
  }
}

module.exports = {
  calcularSaldoGeral,
};
