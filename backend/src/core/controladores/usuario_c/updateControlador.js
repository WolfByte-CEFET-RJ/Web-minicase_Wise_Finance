const { request, response } = require('express');
const { update } = require('../../servicos/usuario_s/updateServico');

const updateControlador = async (req = request, res = response) => {
  try {
    const updateId = req.params.id;
    const {
      nome,
      username,
      email,
      senha,
      senhaConfirmacao,
    } = req.body;

    let updateService = await update(
      updateId, 
      nome,
      username,
      email,
      senha,
      senhaConfirmacao,);
      
    res.json(updateService);

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

module.exports = {
  updateControlador
};