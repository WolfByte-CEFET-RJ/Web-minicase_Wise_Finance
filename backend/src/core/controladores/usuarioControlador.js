const { request, response } = require('express');
const { cadastrarUsuario, deletarUsuario, readOne, update } = require('../servicos/usuarioServico');

async function updateControlador (req = request, res = response) {
  try {
    const updateId = req.usuario.id;
    const {
      nome, 
      username
    } = req.body;

    let updateService = await update(
      updateId,
      nome,
      username
    );
    
    res.json(updateService);

  } catch (error) {
    
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  
  }
};

async function readOneControlador (req = request, res = response) {
  try {
    const id_usuario = req.usuario.id;
    const usuario = await readOne(id_usuario);
    res.json(usuario);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro" });
  }
};

async function deleteControlador(req = request, res = response) {
  const deleteId = req.usuario.id;
  
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

    console.error("Erro:", error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao excluir o usuário.",
    });

  }
}

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

    console.error("Erro:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });

  }
}


module.exports = { 
  cadastroControlador, 
  deleteControlador,  
  readOneControlador, 
  updateControlador  
};

