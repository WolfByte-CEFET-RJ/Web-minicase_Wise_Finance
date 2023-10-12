const express = require("express");
const router = express.Router();
const { readAllControlador, readOneControlador, updateControlador, cadastroControlador, deleteControlador } = require("./controladores/usuarioControlador");
const { loginControlador } = require("./controladores/loginControlador");
const { createDespesaFixa, updateDespesaFixa, deleteDespesaFixa, getAllDespesasFixas, getAllDespesasFixas_Usuario, getDespesaFixaById, 
        createDespesaVar, updateDespesaVar, deleteDespesaVar,getAllDespesasVar, getAllDespesasVar_Usuario, getDespesasVarById
      } = require("./controladores/despesasControlador");
const { createReceitaFixa, updateReceitaFixa, deleteReceitaFixa, getAllReceitaFixa, getAllReceitaFixa_Usuario, getReceitaFixaById, 
        createReceitaVar, updateReceitaVar, deleteReceitaVar, getAllReceitaVar, getAllReceitaVar_Usuario, getReceitaVarById 
      } = require("./controladores/receitaControlador");
const {defineLimite, readLimite} = require("./controladores/limiteControlador")
const {readBalanco} = require("./controladores/balancoControlador")
const auth = require("../middleware/auth")


//USUÁRIO
//adicionar verificação de autenticação???
router.get('/usuario/readAll', readAllControlador);
router.get('/usuario/read/',auth, readOneControlador);
router.patch('/usuario/update/',auth, updateControlador);
router.post('/usuario/cadastro', cadastroControlador);
router.delete('/usuario/delete/',auth, deleteControlador);
router.post('/login', loginControlador);

//DESPESAS FIXAS
router.post('/despesa_fixa/create/',auth, createDespesaFixa);
router.patch('/despesa_fixa/update/:id_desp',auth, updateDespesaFixa);
router.delete('/despesa_fixa/delete/:id_desp',auth, deleteDespesaFixa);
router.get('/despesa_fixa/readAll',auth, getAllDespesasFixas); // development
router.get('/despesa_fixa/read/',auth, getAllDespesasFixas_Usuario);
router.get('/despesa_fixa/read/:id_desp',auth, getDespesaFixaById);

//DESPESAS VARIAVEIS
router.post('/despesa_var/create/',auth, createDespesaVar);
router.patch('/despesa_var/update/:id_desp',auth, updateDespesaVar);
router.delete('/despesa_var/delete/:id_desp',auth, deleteDespesaVar);
router.get('/despesa_var/readAll',auth, getAllDespesasVar); // development
router.get('/despesa_var/read/',auth, getAllDespesasVar_Usuario);
router.get('/despesa_var/read/:id_desp',auth, getDespesasVarById);


//RECEITAS FIXAS
router.post('/receita_fixa/create/',auth, createReceitaFixa);
router.patch('/receita_fixa/update/:id_rec',auth, updateReceitaFixa);
router.delete('/receita_fixa/delete/:id_rec',auth, deleteReceitaFixa);
router.get('/receita_fixa/readAll',auth, getAllReceitaFixa); //development
router.get('/receita_fixa/read/',auth, getAllReceitaFixa_Usuario);
router.get('/receita_fixa/read/:id_rec',auth, getReceitaFixaById);


//RECEITAS VARIÁVEIS
router.post('/receita_var/create/',auth, createReceitaVar);
router.patch('/receita_var/update/:id_rec',auth, updateReceitaVar);
router.delete('/receita_var/delete/:id_rec',auth, deleteReceitaVar);
router.get('/receita_var/readAll',auth, getAllReceitaVar); //development
router.get('/receita_var/read/',auth, getAllReceitaVar_Usuario);
router.get('/receita_var/read/:id_rec',auth, getReceitaVarById);

//LIMITE MENSAL
router.patch('/limite_mensal/define/', auth, defineLimite);
router.get('/limite_mensal/read/', auth, readLimite);

//BALANCO MENSAL
router.get('/balanco_mensal/read/:mes/:ano', auth, readBalanco);

module.exports = router;