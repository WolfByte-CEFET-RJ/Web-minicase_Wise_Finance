const receitaServico = require('./receitaServico');
const despesaServico = require('./despesasServico');
const database = require('../../database/index');

// Função para calcular o saldo geral de um usuário
async function calcularSaldoGeral(userId) {
  try {
    // Obter os totais de receitas e despesas
    const totalReceitasVariaveis = await receitaServico.getTotalReceitasVariaveis(userId);
    const totalReceitasFixas = await receitaServico.getTotalReceitasFixas(userId);
    const totalDespesasVariaveis = await despesaServico.getTotalDespesasVariaveis(userId);
    const totalDespesasFixas = await despesaServico.getTotalDespesasFixas(userId);

    // Calcular o saldo geral
    const saldoGeral = totalReceitasVariaveis + totalReceitasFixas - totalDespesasVariaveis - totalDespesasFixas;

    // Atualizar o saldo geral no banco de dados
    await atualizarSaldoGeralNoBanco(userId, saldoGeral);

    return saldoGeral;
  } catch (error) {
    throw new Error('Erro ao calcular saldo geral: ' + error.message);
  }
}

// Função para atualizar o saldo geral no banco de dados
async function atualizarSaldoGeralNoBanco(userId, saldoGeral) {
  try {
    await database('Usuario')
      .where('ID', userId)
      .update({
        Saldo_Geral: saldoGeral,
      });
  } catch (error) {
    // Trate os erros relacionados ao banco de dados aqui
    throw new Error('Erro ao atualizar saldo geral no banco de dados: ' + error.message);
  }
}

module.exports = {
  calcularSaldoGeral,
};
