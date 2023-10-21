const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const database = require('../../database/index');

async function gerarRelatorioServico(id_user, mes, ano) {
  const doc = new PDFDocument();
  doc.fontSize(12);

  const usuario = await database('Usuario').select('*').where('ID', id_user).first();

  const despesasFixas = await database('Despesa_Fixa').select('*').where('ID_Usuario', id_user);

  const despesasVariaveis = await database('Despesa_Variavel').select('*').where('ID_Usuario', id_user);

  const receitasFixas = await database('Receita_Fixa').select('*').where('ID_Usuario', id_user);

  const receitasVariaveis = await database('Receita_Variavel').select('*').where('ID_Usuario', id_user);

  const balancoMensal = await database('Balanco_Mensal')
    .select('*')
    .where('ID_Usuario', id_user)
    .where('Mes', mes)
    .where('Ano', ano)
    .first();

  // Adicionando informações ao PDF
  doc.text('Relatório Mensal de Finanças Pessoais', { align: 'center' });
  doc.text(`Usuário: ${usuario.Nome}`);
  doc.text(`Saldo Geral: $${parseFloat(usuario.Saldo_Geral).toFixed(2)}`);
  doc.text('Despesas Fixas:');
  despesasFixas.forEach((despesa) => {
    doc.text(`${despesa.Nome}: $${parseFloat(despesa.Valor).toFixed(2)}`);
  });
  doc.text('Despesas Variáveis:');
  despesasVariaveis.forEach((despesa) => {
    doc.text(`${despesa.Nome}: $${parseFloat(despesa.Valor).toFixed(2)}`);
  });
  doc.text('Receitas Fixas:');
  receitasFixas.forEach((receita) => {
    doc.text(`${receita.Nome}: $${parseFloat(receita.Valor).toFixed(2)}`);
  });
  doc.text('Receitas Variáveis:');
  receitasVariaveis.forEach((receita) => {
    doc.text(`${receita.Nome}: $${parseFloat(receita.Valor).toFixed(2)}`);
  });
  doc.text(`Balanço Mensal: $${parseFloat(balancoMensal.Valor_Balanco).toFixed(2)}`);

  //doc.save('relatorio_mensal.pdf');

  // Criando caminho de saída para o relatório
  const outputPath = path.join('C:/Users/vilag/Documents/GitHub/Web-minicase_Wise_Finance/', 'backend'); // Diretório onde o PDF será salvo
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }
  const outputFileName = `relatorio_${id_user}_${ano}_${mes}.pdf`;
  const outputFilePath = path.join(outputPath, outputFileName);

  // Verificando se o arquivo já existe
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath); // Remove o arquivo existente
  }

  // Criando PDF
  doc.pipe(fs.createWriteStream(outputFilePath));

  // Adicionando informações ao PDF (o restante do seu código)

  // Finalizando PDF
  doc.end();
  
  return outputFilePath;
}

module.exports = { gerarRelatorioServico };
