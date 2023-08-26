const { request, response } = require('express');
const { update } = require('../../servicos/usuario_s/updateServico');

const updateControlador = async (req = request, res = response) => {
  try {
    const updateId = req.params.id;
    let updatedUser = req.body;

    let updateService = await update(updateId, updatedUser);
    res.json(updateService);

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

module.exports = {
  updateControlador
};