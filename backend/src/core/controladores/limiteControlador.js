const { request, response } = require('express');
const { define} = require("../servicos/limiteService")
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function defineLimite (req = request, res = response, next) {
    try {
  
        const user = req.usuario.id;
        const limite = req.body.val;
        
        const executa = await define(user, limite); 

        res.json(executa);
        next();
  
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro" });
    
  }
};

module.exports = { 
    defineLimite,
};