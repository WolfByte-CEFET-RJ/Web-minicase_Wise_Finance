const express = require("express");
const router = express.Router();
const { readOneControlador, updateControlador, cadastroControlador, deleteControlador } = require("./controladores/usuarioControlador");
const { loginControlador } = require("./controladores/loginControlador");
const { logoutControlador } = require("./controladores/logoutControlador");
const { createDespesaFixa, updateDespesaFixa, deleteDespesaFixa, getAllDespesasFixas_Usuario, getDespesaFixaById, 
        createDespesaVar, updateDespesaVar, deleteDespesaVar, getAllDespesasVar_Usuario, getDespesasVarById
      } = require("./controladores/despesasControlador");
const { createReceitaFixa, updateReceitaFixa, deleteReceitaFixa, getAllReceitaFixa_Usuario, getReceitaFixaById, 
        createReceitaVar, updateReceitaVar, deleteReceitaVar, getAllReceitaVar_Usuario, getReceitaVarById 
      } = require("./controladores/receitaControlador");
const {defineLimite, readLimite} = require("./controladores/limiteControlador");
const {readBalanco} = require("./controladores/balancoControlador");
const {gerarRelatorio, readOneRelatorios, readAllRelatorios} = require("./controladores/relatorioControlador");
const { getTaxaDolar, getTaxaEuro } = require("./controladores/taxaControlador")
const auth = require("../middleware/auth")


//USUÁRIO
router.get('/usuario',auth, readOneControlador);
router.patch('/usuario',auth, updateControlador);
router.post('/usuario', cadastroControlador);
router.delete('/usuario',auth, deleteControlador);
router.post('/login', loginControlador);
router.post('/logout', auth, logoutControlador);

//DESPESAS FIXAS
router.post('/despesa_fixa',auth, createDespesaFixa);
router.patch('/despesa_fixa/:id_desp',auth, updateDespesaFixa);
router.delete('/despesa_fixa/:id_desp',auth, deleteDespesaFixa);
router.get('/despesa_fixa',auth, getAllDespesasFixas_Usuario);
router.get('/despesa_fixa/:id_desp',auth, getDespesaFixaById);

//DESPESAS VARIAVEIS
router.post('/despesa_var',auth, createDespesaVar);
router.patch('/despesa_var/:id_desp',auth, updateDespesaVar);
router.delete('/despesa_var/:id_desp',auth, deleteDespesaVar);
router.get('/despesa_var',auth, getAllDespesasVar_Usuario);
router.get('/despesa_var/:id_desp',auth, getDespesasVarById);

//RECEITAS FIXAS
router.post('/receita_fixa',auth, createReceitaFixa);
router.patch('/receita_fixa/:id_rec',auth, updateReceitaFixa);
router.delete('/receita_fixa/:id_rec',auth, deleteReceitaFixa);
router.get('/receita_fixa/',auth, getAllReceitaFixa_Usuario);
router.get('/receita_fixa/:id_rec',auth, getReceitaFixaById);

//RECEITAS VARIÁVEIS
router.post('/receita_var',auth, createReceitaVar);
router.patch('/receita_var/:id_rec',auth, updateReceitaVar);
router.delete('/receita_var/:id_rec',auth, deleteReceitaVar);
router.get('/receita_var',auth, getAllReceitaVar_Usuario);
router.get('/receita_var/:id_rec',auth, getReceitaVarById);

//LIMITE MENSAL
router.patch('/limite_mensal', auth, defineLimite);
router.get('/limite_mensal', auth, readLimite);

//BALANCO MENSAL
router.get('/balanco_mensal/:mes/:ano', auth, readBalanco);

//RELATORIO
router.get('/relatorio', auth, readAllRelatorios);
router.get('/relatorio/:mes/:ano', auth, readOneRelatorios);

//TAXAS DE CÂMBIO
router.get('/taxa/dol', auth, getTaxaDolar);
router.get('/taxa/eur', auth, getTaxaEuro);

//router.get('/relatorio/:mes/:ano', auth, gerarRelatorio);
module.exports = router;