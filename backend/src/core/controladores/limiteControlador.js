const { request, response } = require('express');
const { define} = require("../servicos/limiteService")
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function defineLimite (req = request, res = response) {
    try {
  
        const user = req.params.id_user;
        const limite = req.params.val;
        console.log(req.usuario.id);
        
        const executa = await define(user, limite); 

        res.json(executa);
  
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro" });
    
  }
};

module.exports = { 
    defineLimite,
};