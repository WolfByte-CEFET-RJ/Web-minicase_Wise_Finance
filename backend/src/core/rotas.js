const express = require("express");
const router = express.Router();
const { readAllControlador, readOneControlador, updateControlador, cadastroControlador, deleteControlador } = require("./controladores/usuarioControlador");
const { loginControlador } = require("./controladores/loginControlador");
const { createDespesaFixa, updateDespesaFixa, deleteDespesaFixa, getAllDespesasFixas, getAllDespesasFixas_Usuario, getDespesaFixaById, 
        createDespesaVar, updateDespesaVar, deleteDespesaVar, getAllDespesasVar, getAllDespesasVar_Usuario, getDespesasVarById, 
      } = require("./controladores/despesasControlador");
const { createReceitaFixa, updateReceitaFixa, deleteReceitaFixa, getAllReceitaFixa, getAllReceitaFixa_Usuario, getReceitaFixaById, 
        createReceitaVar, updateReceitaVar, deleteReceitaVar, getAllReceitaVar, getAllReceitaVar_Usuario, getReceitaVarById 
      } = require("./controladores/receitaControlador");
const auth = require("../middleware/auth")


//USUÁRIO
router.get('/usuario/read', readAllControlador);
router.get('/usuario/read/:id', readOneControlador);
router.patch('/usuario/update/:id', updateControlador);
router.post('/usuario/cadastro', cadastroControlador);
router.delete('/usuario/delete/:id', deleteControlador);
router.post('/login', loginControlador);

//DESPESAS FIXAS
router.post('/despesa_fixa/create/:id_user',auth, createDespesaFixa);
router.patch('/despesa_fixa/update/:id_user/:id_desp',auth, updateDespesaFixa);
router.delete('/despesa_fixa/delete/:id_user/:id_desp',auth, deleteDespesaFixa);
router.get('/despesa_fixa/readAll',auth, getAllDespesasFixas);
router.get('/despesa_fixa/read/:id_user',auth, getAllDespesasFixas_Usuario);
router.get('/despesa_fixa/read/:id_user/:id_desp',auth, getDespesaFixaById);

//DESPESAS VARIAVEIS
router.post('/despesa_var/create/:id_user',auth, createDespesaVar);
router.patch('/despesa_var/update/:id_user/:id_desp',auth, updateDespesaVar);
router.delete('/despesa_var/delete/:id_user/:id_desp',auth, deleteDespesaVar);
router.get('/despesa_var/readAll',auth, getAllDespesasVar);
router.get('/despesa_var/read/:id_user',auth, getAllDespesasVar_Usuario);
router.get('/despesa_var/read/:id_user/:id_desp',auth, getDespesasVarById);

//RECEITAS FIXAS
router.post('/receita_fixa/create/:id_user',auth, createReceitaFixa);
router.patch('/receita_fixa/update/:id_user/:id_desp',auth, updateReceitaFixa);
router.delete('/receita_fixa/delete/:id_user/:id_desp',auth, deleteReceitaFixa);
router.get('/receita_fixa/readAll',auth, getAllReceitaFixa);
router.get('/receita_fixa/read/:id_user',auth, getAllReceitaFixa_Usuario);
router.get('/receita_fixa/read/:id_user/:id_desp',auth, getReceitaFixaById);

//RECEITAS VARIÁVEIS
router.post('/receita_var/create/:id_user',auth, createReceitaVar);
router.patch('/receita_var/update/:id_user/:id_desp',auth, updateReceitaVar);
router.delete('/receita_var/delete/:id_user/:id_desp',auth, deleteReceitaVar);
router.get('/receita_var/readAll',auth, getAllReceitaVar);
router.get('/receita_var/read/:id_user',auth, getAllReceitaVar_Usuario);
router.get('/receita_var/read/:id_user/:id_desp',auth, getReceitaVarById);

//LIMITE MENSAL


module.exports = router;