const database = require('../../database/index');

async function calcularSaldoGeral(userId, valor, isReceita) {
  try {
    const usuario = await database('Usuario').select('*').where('ID', userId).first();

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    let saldoAtualizado;
    if (isReceita) {
      saldoAtualizado = usuario.Saldo_Geral + parseFloat(valor);
    } else {
      saldoAtualizado = usuario.Saldo_Geral - parseFloat(valor);
    }

    await atualizarSaldoGeralNoBanco(userId, saldoAtualizado);

    return saldoAtualizado;
  } catch (error) {
    throw new Error('Erro ao calcular saldo geral: ' + error.message);
  }
}

async function atualizarSaldoGeralNoBanco(userId, saldoAtualizado) {
  try {
    await database('Usuario')
      .where('ID', userId)
      .update({
        Saldo_Geral: saldoAtualizado,
      });
  } catch (error) {
    throw new Error('Erro ao atualizar saldo geral no banco de dados: ' + error.message);
  }
}

module.exports = {
  calcularSaldoGeral,
};
