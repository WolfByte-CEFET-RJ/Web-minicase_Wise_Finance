const { request, response } = require('express');
const { cadastrarUsuario } = require('../../servicos/usuario_s/cadastroServico');

async function cadastroControlador(req = request, res = response) {
  try {
    const {
      nome,
      username,
      email,
      senha,
      senhaConfirmacao,
    } = req.body;

    const cadastroServico = await cadastrarUsuario(
      nome,
      username,
      email,
      senha,
      senhaConfirmacao,
    );

    res.json(cadastroServico);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}
module.exports = { cadastroControlador };


