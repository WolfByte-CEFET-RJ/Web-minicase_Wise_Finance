const express = require("express");
const router = express.Router();
const { readAllControlador, readOneControlador } = require("./controladores/usuario_c/readControlador");
const { updateControlador } = require("./controladores/usuario_c/updateControlador");
const { cadastroControlador} = require ("./controladores/usuario_c/cadastroControlador");
const { deleteControlador} = require ("./controladores/usuario_c/deleteControlador");
const { loginControlador} = require ("./controladores/usuario_c/loginControlador");


//USUÁRIO
router.get('/usuario/read', readAllControlador);
router.get('/usuario/read/:id', readOneControlador);
router.patch('/usuario/update/:id', updateControlador);
router.post('/usuario/cadaster', cadastroControlador);
router.delete('/usuario/delete/:id', deleteControlador);
router.post("/login", loginControlador);

module.exports = router;