const { request, response } = require('express');
const { createReceitaFixaServico, updateReceitaFixaServico, deleteReceitaFixaServico, getAllReceitasFixas_Usuario_Servico, getReceitaFixaByIdServico, getAllReceitaFixaServico,
        //createReceitaVarServico, updateReceitaVarServico, deleteReceitaVarServico, getAllReceitaVar_Usuario_Servico, getReceitaVarByIdServico, getAllReceitaVarServico,  
      } = require('../servicos/receitaServico');

//RECEITAS FIXAS

async function createReceitaFixa(req, res) {
  const userId = req.params.id_user;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createReceitaFixaServico(userId, nome, valor, descricao, dataPagamento); 

    res.json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  async function getAllReceitaFixa(req, res) {
    const userId = req.params.id_user;
    console.log(userId)
    try {
      const despesasFixas = await getAllDespesasFixasServico(userId); 
      res.json(despesasFixas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getReceitaFixaById(req, res) {
    const userId = req.params.id_user;
    const despesaFixaId = req.params.id_desp;
  
    try {
      const despesaFixa = await getReceitaFixaByIdServico(userId, despesaFixaId);
  
      if (!despesaFixa) {
        return res.status(404).json({ error: 'Despesa fixa não encontrada' });
      }
  
      res.json(despesaFixa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getAllReceitaFixa_Usuario(req, res) {
  try {
    const despesas = await getAllReceitaFixaServico();
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  }
  
  async function updateReceitaFixa(req, res) {
    const userId = req.params.id_user;
  const despesaId = req.params.id_desp;

  const {
    nome,
    valor,
    descricao,
    dataPagamento,
  } = req.body;

  try {
    const update = await updateReceitaFixaServico(userId, despesaId, nome, valor, descricao, dataPagamento);

    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  async function deleteReceitaFixa(req, res) {
    const userId = req.params.id_user;
    const despesaId = req.params.id_desp;
  
    try {
      const deletar = await deleteReceitaFixaServico(userId, despesaId);
      res.json(deletar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

//RECEITAS VARIÁVEIS

module.exports = {
    //RECEITA FIXA
    
    createReceitaFixa,
    getAllReceitaFixa,
    getAllReceitaFixa_Usuario,
    getReceitaFixaById,
    updateReceitaFixa,
    deleteReceitaFixa,

    /*
    //DESPESA VARIÁVEL
    createReceitaVar,
    getAllReceitaVar,
    getAllReceitaVar_Usuario,
    getReceitaVarById,
    updateReceitaVar,
    deleteReceitaVar
    */
};