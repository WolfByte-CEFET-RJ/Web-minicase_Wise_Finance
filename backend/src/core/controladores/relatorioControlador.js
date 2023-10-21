const { request, response } = require('express');
const { gerarRelatorioServico } = require('../servicos/relatorioServico');

async function gerarRelatorio(req, res) {
  try {
    const id_user = req.usuario.id;
    const mes = req.params.mes;
    const ano = req.params.ano;

    await gerarRelatorioServico(id_user, mes, ano);
    res.json({message: 'Arquivo gerado!'})
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na geração do relatório');
  }
}

module.exports = { gerarRelatorio };
