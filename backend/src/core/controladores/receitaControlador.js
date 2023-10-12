const { request, response } = require('express');
const { createReceitaFixaServico, updateReceitaFixaServico, deleteReceitaFixaServico, getAllReceitasFixas_Usuario_Servico, getReceitaFixaByIdServico, getAllReceitaFixaServico,
        createReceitaVarServico, updateReceitaVarServico, deleteReceitaVarServico, getAllReceitaVar_Usuario_Servico, getReceitaVarByIdServico, getAllReceitaVarServico,  
      } = require('../servicos/receitaServico');

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

    res.json(create);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllReceitaFixa(req, res) {
    try {
      const receitasFixas = await getAllReceitaFixaServico(); 
      res.json(receitasFixas);
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
    console.log(userId)
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
  
      res.json(create);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function getAllReceitaVar(req, res) {
    try {
        const receita = await getAllReceitaVarServico();
        res.json(receita);
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
      res.json(deletar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
    //RECEITA FIXA    
    createReceitaFixa,
    getAllReceitaFixa,
    getAllReceitaFixa_Usuario,
    getReceitaFixaById,
    updateReceitaFixa,
    deleteReceitaFixa,
    //DESPESA VARIÁVEL
    createReceitaVar,
    getAllReceitaVar,
    getAllReceitaVar_Usuario,
    getReceitaVarById,
    updateReceitaVar,
    deleteReceitaVar
    
};