const { request, response } = require('express');
const { readByUsuario } = require('../servicos/balancoServico')
require('dotenv').config();

async function readBalanco (req = request, res = response) {
    try {
  
        const user = req.usuario.id;
        const mes = req.params.mes;
        const ano = req.params.ano;
        
        const balanco = await readByUsuario(user, mes, ano); 

        res.json(balanco);
  
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro" });
    
  }
};

module.exports = { 
    readBalanco
};