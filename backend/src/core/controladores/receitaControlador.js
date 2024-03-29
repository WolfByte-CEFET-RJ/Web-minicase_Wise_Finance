const { request, response } = require('express');
const { createReceitaFixaServico, updateReceitaFixaServico, deleteReceitaFixaServico, getAllReceitasFixas_Usuario_Servico, getReceitaFixaByIdServico, 
        createReceitaVarServico, updateReceitaVarServico, deleteReceitaVarServico, getAllReceitaVar_Usuario_Servico, getReceitaVarByIdServico,  updateReceitasTotais,
      } = require('../servicos/receitaServico');
const { aumentaSaldo, diminuiSaldo } = require('../servicos/saldoGeralServico');

//RECEITAS FIXAS
async function createReceitaFixa(req, res) {
  const userId = req.usuario.id;
  const {
    nome,
    valor,
    descricao,
    dataPagamento, 
  } = req.body;

  try {
    const create = await createReceitaFixaServico(userId, nome, valor, descricao, dataPagamento); 
    if(create.status){
      await updateReceitasTotais(userId);
      await aumentaSaldo(userId, valor);
    }

    res.json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getReceitaFixaById(req, res) {
    const userId = req.usuario.id;  
    const receitaFixaId = req.params.id_rec;
  
    try {
      const receitaFixa = await getReceitaFixaByIdServico(userId, receitaFixaId);
  
      if (!receitaFixa) {
        return res.status(404).json({ error: 'Receita fixa não encontrada' });
      }
  
      res.json(receitaFixa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  
async function getAllReceitaFixa_Usuario(req, res) {
    const userId = req.usuario.id;
    try {
      const despesasFixas = await getAllReceitasFixas_Usuario_Servico(userId); 
      res.json(despesasFixas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
  
  async function updateReceitaFixa(req, res) {
    const userId = req.usuario.id;
    const receitaId = req.params.id_rec;

  const {
    nome,
    valor,
    descricao,
    dataPagamento,
  } = req.body;

  try {
    const update = await updateReceitaFixaServico(userId, receitaId, nome, valor, descricao, dataPagamento);
    if(update.status){
      await updateReceitasTotais(userId); 
      await diminuiSaldo(userId, update.valorAnterior);
      await aumentaSaldo(userId, valor);
    }

    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteReceitaFixa(req, res) {
    const userId = req.usuario.id;
    const receitaId = req.params.id_rec;
  
    try {
      const deletar = await deleteReceitaFixaServico(userId, receitaId);
      if(deletar.status){
        await updateReceitasTotais(userId); 
        await diminuiSaldo(userId, deletar.valor);
      }

      res.json(deletar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

//RECEITAS VARIÁVEIS
async function createReceitaVar(req, res) {
    const userId = req.usuario.id;
    const {
      nome,
      valor,
      descricao,
      dataPagamento, 
    } = req.body;
  
    try {
      const create = await createReceitaVarServico(userId, nome, valor, descricao, dataPagamento); 
      if(create.status){
        await updateReceitasTotais(userId); 
        await aumentaSaldo(userId, valor);
      }

  
      res.json(create);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getReceitaVarById(req, res) {
    const userId = req.usuario.id;
    const receitaVarId = req.params.id_rec;
  
    try {
      const receitaVar = await getReceitaVarByIdServico(userId, receitaVarId);
  
      if (!receitaVar) {
        return res.status(404).json({ error: 'Receita Variável não encontrada' });
      }
  
      res.json(receitaVar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getAllReceitaVar_Usuario(req, res) {
    const userId = req.usuario.id;
    try {
      const receitaVariavel = await getAllReceitaVar_Usuario_Servico(userId); 
      res.json(receitaVariavel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function updateReceitaVar(req, res) {
    const userId = req.usuario.id;
    const receitaId = req.params.id_rec;

  const {
    nome,
    valor,
    descricao,
    dataPagamento,
  } = req.body;

  try {
    const update = await updateReceitaVarServico(userId, receitaId, nome, valor, descricao, dataPagamento);
    if(update.status){
      await updateReceitasTotais(userId); 
      await updateReceitasTotais(userId); 
      await diminuiSaldo(userId, update.valorAnterior);
      await aumentaSaldo(userId, valor);
    }


    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteReceitaVar(req, res) {
    const userId = req.usuario.id;
    const receitaId = req.params.id_rec;
  
    try {
      const deletar = await deleteReceitaVarServico(userId, receitaId);
      if(deletar.status){
          await updateReceitasTotais(userId); 
          await diminuiSaldo(userId, deletar.valor);
      }

      res.json(deletar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    //RECEITA FIXA    
    createReceitaFixa,
    getAllReceitaFixa_Usuario,
    getReceitaFixaById,
    updateReceitaFixa,
    deleteReceitaFixa,

    //DESPESA VARIÁVEL
    createReceitaVar,
    getAllReceitaVar_Usuario,
    getReceitaVarById,
    updateReceitaVar,
    deleteReceitaVar  
};