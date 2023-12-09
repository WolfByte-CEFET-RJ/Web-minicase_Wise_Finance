const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const database = require('../../database/index');

async function gerarRelatorioServico(id_user, mes, ano) {
  const doc = new PDFDocument();
  const fontPath = path.join(__dirname, 'Relatorio', 'Merriweather-Italic.ttf');
  doc.font(fontPath);
  doc.fontSize(20);


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

  // caminho de saída para o relatório
  const outputPath = path.join(__dirname, 'relatorios');
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const outputFileName = `relatorio_${id_user}_${ano}_${mes}.pdf`;
  const outputFilePath = path.join(outputPath, outputFileName);

  // Verificando se o arquivo já existe
  if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath); // Remove o arquivo existente
  }

  // Criando PDF
  doc.pipe(fs.createWriteStream(outputFilePath));
  doc.rect(45, 110, 520, 1).stroke(); 
  doc.moveDown();
  doc.moveDown();
  const imagePath = path.join(__dirname,'Relatorio','ImagemRelatorio.png'); 
  doc.image(imagePath, 285, 30, { width: 50, height: 50 });
  doc.moveDown();
  // Adicionando informações ao PDF
  doc.text('Relatório Mensal de Finanças Pessoais', { align: 'center' });
  doc.moveDown();
  doc.text(`Usuário: ${usuario.Nome}`);
  doc.moveDown();
  doc.text(`Saldo Geral: R$ ${parseFloat(usuario.Saldo_Geral).toFixed(2)}`);
  doc.moveDown();
  doc.text('Despesas Fixas:');
  doc.moveDown();
  var qtDespesasFixas = 0;
  despesasFixas.forEach((despesa) => {
    qtDespesasFixas++;
    doc.fontSize(12);
    doc.text(` ${qtDespesasFixas}      ${despesa.Nome}: R$ ${parseFloat(despesa.Valor).toFixed(2)}`);
    doc.moveDown();
  });
  doc.moveDown();
  doc.fontSize(20);
  doc.text('Despesas Variáveis:');
  doc.moveDown();
  var qtDespesasVariaveis = 0;
  despesasVariaveis.forEach((despesa) => {
    qtDespesasVariaveis++;
    doc.fontSize(12);
    doc.text(` ${qtDespesasVariaveis}      ${despesa.Nome}: R$ ${parseFloat(despesa.Valor).toFixed(2)}`);
    doc.moveDown();
  });
  doc.moveDown();
  doc.fontSize(20);
  doc.text('Receitas Fixas:');
  doc.moveDown();
  var qtReceitasFixas = 0;
  receitasFixas.forEach((receita) => {
    qtReceitasFixas++;
    doc.fontSize(12);
    doc.text(` ${qtReceitasFixas}      ${receita.Nome}: R$ ${parseFloat(receita.Valor).toFixed(2)}`);
    doc.moveDown();
  });
  doc.moveDown();
  doc.fontSize(20);
  doc.text('Receitas Variáveis:');
  doc.moveDown();
  var qtReceitasVariaveis = 0;
  receitasVariaveis.forEach((receita) => {
    qtReceitasVariaveis++;
    doc.fontSize(12);
    doc.text(` ${qtReceitasVariaveis}      ${receita.Nome}: R$ ${parseFloat(receita.Valor).toFixed(2)}`);
    doc.moveDown();
  });
  doc.moveDown();
  doc.fontSize(20);
  doc.text(`Balanço Mensal: R$ ${parseFloat(balancoMensal.Valor_Balanco).toFixed(2)}`);
  // Finalizando PDF
  doc.end();

  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1; 
  const anoAtual = dataAtual.getFullYear(); 

  const relatorio = {
    ID_Usuario: id_user,
    Link_Relatorio: outputFilePath,
    Mes: mesAtual,
    Ano: anoAtual,
    Data_Criacao: database.raw('CURRENT_TIMESTAMP')
  };

  await database('Relatorio_Mensal').insert(relatorio);

  return outputFilePath;
}

async function readOneRelatoriosServico(id_user, mes, ano){
  try {
    const relatorio = await database('Relatorio_Mensal')
    .select("*")
    .where({ ID_Usuario: id_user, Mes: mes, Ano: ano })
    .first();
    
    return relatorio
  
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

async function readAllRelatoriosServico(id_user){
  try {
    return await database('Relatorio_Mensal')
      .select("*")
      .where({ ID_Usuario: id_user })
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}


module.exports = { 
  readAllRelatoriosServico,
  readOneRelatoriosServico,
  gerarRelatorioServico 
};
