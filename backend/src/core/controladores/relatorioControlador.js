const { request, response } = require('express');
const { gerarRelatorioServico, readAllRelatoriosServico, readOneRelatoriosServico } = require('../servicos/relatorioServico');

async function gerarRelatorio(req = request, res = response) {
  try {
    const id_user = req.usuario.id;
    const mes = req.params.mes;
    const ano = req.params.ano;

    const relatorio = await gerarRelatorioServico(id_user, mes, ano);
    res.json({status: true ,link: relatorio})
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na geração do relatório');
  }
}

async function readAllRelatorios(req = request, res = response){
  const userId = req.usuario.id;
  try {
    const relatorios = await readAllRelatoriosServico(userId)

    if (!relatorios) {
      return res.status(404).json({ error: 'Nenhum relatório encontrado' });
    }

    res.json(relatorios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function readOneRelatorios(req = request, res = response){
  const userId = req.usuario.id;
  const mes = req.params.mes;
  const ano = req.params.ano;
  try {
    const relatorio = await readOneRelatoriosServico(userId, mes, ano);

    if (!relatorio) {
      return res.status(404).json({ error: 'Nenhum relatório encontrado' });
    }

    res.json(relatorio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
  readAllRelatorios,
  readOneRelatorios,
  gerarRelatorio 
};
