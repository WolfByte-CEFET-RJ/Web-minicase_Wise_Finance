const { request, response } = require('express');
const { define, readByUsuario} = require("../servicos/limiteService")
require('dotenv').config();

async function defineLimite (req = request, res = response, next) {
    try {
        const user = req.usuario.id;
        const limite = req.body.val;
        
        const executa = await define(user, limite); 

        res.json(executa);
  
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro" });
  }
};

async function readLimite (req = request, res = response) {
    try {
        const user = req.usuario.id;

        const limite = await readByUsuario(user); 

        res.json(limite);
  
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro" });
    
  }
};

module.exports = { 
    defineLimite,
    readLimite
};