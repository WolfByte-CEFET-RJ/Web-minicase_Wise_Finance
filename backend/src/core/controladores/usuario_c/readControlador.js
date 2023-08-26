const { request, response } = require('express');
const { readAll, readOne } = require('../../servicos/usuario_s/readServico');

const readAllControlador = async (req = request, res = response) => {
  try {
    const lista = await readAll(req, res);
    res.json(lista)
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

const readOneControlador = async (req = request, res = response) => {
  try {
    const id_usuario = req.params.id;
    const usuario = await readOne(id_usuario);
    res.json(usuario);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

module.exports = {
  readAllControlador,
  readOneControlador
};