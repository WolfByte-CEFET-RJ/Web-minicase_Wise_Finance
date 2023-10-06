const schedule = require('node-schedule');
const database = require('../database/index');

//COLOCAR "BARREIRA DO RELATÓRIO" PARA SÓ APAGAR QUANDO O RELATORIO FOR GERADO

async function limparDespesas() {
  try {
    await database("Despesa_Variavel").delete();
    console.log('Despesas excluídas com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir despesas:', error);
  } 
}

async function limparReceitas() {
    try {
      await database("Receita_Variavel").delete();
      console.log('Receitas excluídas com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir receitas:', error);
    } 
}

async function viraMes(){
    schedule.scheduleJob('0 0 1 * *', limparDespesas);
    schedule.scheduleJob('0 0 1 * *', limparReceitas);
    //schedule.scheduleJob(new Date(Date.now() + 100), limparDespesas);
    //schedule.scheduleJob(new Date(Date.now() + 100), limparReceitas);
}

module.exports = {
    viraMes
};