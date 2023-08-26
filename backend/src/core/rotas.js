const express = require("express");
const router = express.Router();
const { verTudoControlador } = require('./controladores/teste_lista');
const { readAllControlador, readOneControlador } = require("./controladores/usuario_c/readControlador");
const { updateControlador } = require("./controladores/usuario_c/updateControlador")


//TESTE
router.get("/lista", verTudoControlador);

//USUÁRIO
router.get('/usuario/read', readAllControlador);
router.get('/usuario/read/:id', readOneControlador);
router.patch('/usuario/update/:id', updateControlador);
/*
router.post('/usuario/create', )
router.delete('/usuario/delete', )*/

module.exports = router;