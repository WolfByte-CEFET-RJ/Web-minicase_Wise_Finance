const { request, response } = require('express');
const {altera, define} = require("../servicos/limiteService")

async function defineLimite (req = request, res = response) {
    try {
  
        const user = req.params.id_user;
        const limite = req.params.val;

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