const database = require('../../database/index');

async function aumentaSaldo(userId, valor) {
  try {
    const usuario = await database('Usuario').select('*').where('ID', userId).first();

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    saldoAtualizado = parseFloat(usuario.Saldo_Geral) + parseFloat(valor);

    await atualizarSaldoGeral(userId, saldoAtualizado);

    return saldoAtualizado;
  } catch (error) {
    throw new Error('Erro ao calcular saldo geral: ' + error.message);
  }
}

async function diminuiSaldo(userId, valor) {
  try {
    const usuario = await database('Usuario').select('*').where('ID', userId).first();

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    saldoAtualizado = parseFloat(usuario.Saldo_Geral) - parseFloat(valor);

    await atualizarSaldoGeral(userId, saldoAtualizado);

    return saldoAtualizado;
  } catch (error) {
    throw new Error('Erro ao calcular saldo geral: ' + error.message);
  }
}

async function atualizarSaldoGeral(userId, saldoAtualizado) {
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
  aumentaSaldo,
  diminuiSaldo
};
