const { request, response } = require('express');
const { verTudo } = require('../servicos/teste_lista');

const verTudoControlador = async (req = request, res = response) => {
  try {
    await verTudo(req, res);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

module.exports = {
  verTudoControlador
};