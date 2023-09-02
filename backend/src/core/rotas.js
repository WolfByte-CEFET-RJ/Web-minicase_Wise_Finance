const express = require("express");
const router = express.Router();
const { readAllControlador, readOneControlador, updateControlador, cadastroControlador, deleteControlador } = require("./controladores/usuarioControlador");
const { loginControlador } = require("./controladores/loginControlador");


//USUÁRIO
router.get('/usuario/read', readAllControlador);
router.get('/usuario/read/:id', readOneControlador);
router.patch('/usuario/update/:id', updateControlador);
router.post('/usuario/cadastro', cadastroControlador);
router.delete('/usuario/delete/:id', deleteControlador);
router.post("/login", loginControlador);

module.exports = router;