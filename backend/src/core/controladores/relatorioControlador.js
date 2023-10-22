const { request, response } = require('express');
const { gerarRelatorioServico } = require('../servicos/relatorioServico');

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

module.exports = { gerarRelatorio };
