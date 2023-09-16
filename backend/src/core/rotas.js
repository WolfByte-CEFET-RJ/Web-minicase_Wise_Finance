const express = require("express");
const router = express.Router();
const { readAllControlador, readOneControlador, updateControlador, cadastroControlador, deleteControlador } = require("./controladores/usuarioControlador");
const { loginControlador } = require("./controladores/loginControlador");
const { createDespesaFixa, updateDespesaFixa, deleteDespesaFixa, getAllDespesasFixas, getAllDespesasFixas_Usuario, getDespesaFixaById } = require("./controladores/homeControlador");
const auth = require("../middleware/auth")


//USUÁRIO
router.get('/usuario/read', readAllControlador);
router.get('/usuario/read/:id', readOneControlador);
router.patch('/usuario/update/:id', updateControlador);
router.post('/usuario/cadastro', cadastroControlador);
router.delete('/usuario/delete/:id', deleteControlador);
router.post('/login', loginControlador);

//DESPESAS FIXAS
router.post('/despesa_fixa/create/:id',auth, createDespesaFixa);
router.patch('/despesa_fixa/update/:id_user/:id_desp',auth, updateDespesaFixa);
router.delete('/despesa_fixa/delete/:id_user/:id_desp',auth, deleteDespesaFixa);
router.get('/despesa_fixa/readAll',auth, getAllDespesasFixas);
router.get('/despesa_fixa/read/:id_user',auth, getAllDespesasFixas_Usuario);
router.get('/despesa_fixa/read/:id_user/:id_desp',auth, getDespesaFixaById);

//DESPESAS VARIAVEIS

//RECEITAS FIXAS

//RECEITAS VARIÁVEIS

module.exports = router;