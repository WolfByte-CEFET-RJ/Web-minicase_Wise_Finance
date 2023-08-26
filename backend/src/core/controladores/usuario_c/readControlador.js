const { request, response } = require('express');
const { readAll } = require('../../servicos/usuario_s/readServico');

const readAllControlador = async (req = request, res = response) => {
  try {
    await readAll(req, res);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

module.exports = {
  readAllControlador
};