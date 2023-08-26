const { request, response } = require("express");
const { deletarUsuario } = require('../../servicos/usuario_s/deleteServico');

async function deleteControlador(req = request, res = response) {
  const deleteId = req.params.id;

  try {
    const deleteServiceResponse = await deletarUsuario(deleteId);

    
    if (deleteServiceResponse.status) {
      res.status(200).json({
        success: true,
        message: "Usuário excluído com sucesso.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: deleteServiceResponse.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao excluir o usuário.",
    });
  }
}

module.exports = { deleteControlador };

