const express = require("express");
const router = express.Router();
const { verTudoControlador } = require('./controladores/teste_lista');
const { readAllControlador } = require("./controladores/usuario_c/readControlador");


//TESTE
router.get("/lista", verTudoControlador);

//USUÁRIO
router.get('/usuario/read', readAllControlador);
/*
router.get('/usuario/read/:id', )
router.post('/usuario/create', )
router.patch('/usuario/update', )
router.delete('/usuario/delete', )*/

module.exports = router;