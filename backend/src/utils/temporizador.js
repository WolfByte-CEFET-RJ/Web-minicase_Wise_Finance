//ARQUIVO COM TODAS AS FUNCIONALIDADES TEMPORIZADAS
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

//COLOCAR "BARREIRA DO RELATÓRIO" PARA SÓ APAGAR QUANDO O RELATORIO FOR GERADO
async function limparReceitas() {
    try {
      await database("Receita_Variavel").delete();
      console.log('Receitas excluídas com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir receitas:', error);
    } 
}

async function geraBalanco(){
  try {
    const usuarios = await database("Usuario").select("id");

    if(!usuarios){
      throw new Error("Não há usuários");
    }

    const timer = new Date();
    const mesAtual = timer.getMonth() + 1;
    const anoAtual = timer.getFullYear();

    for (const user of usuarios) {
      const [totalDespVarResult, totalDespFixaResult, totalRecVarResult, totalRecFixaResult] = await Promise.all([
        database("Despesa_Variavel").sum("Valor as Tot_Desp_Var").where("id_usuario", user.id).first(),
        database("Despesa_Fixa").sum("Valor as Tot_Desp_Fixa").where("id_usuario", user.id).first(),
        database("Receita_Variavel").sum("Valor as Tot_Rec_Var").where("id_usuario", user.id).first(),
        database("Receita_Fixa").sum("Valor as Tot_Rec_Fixa").where("id_usuario", user.id).first(),
      ]);
      
      const totalDespVar = parseFloat(totalDespVarResult.Tot_Desp_Var) || 0;
      const totalDespFixa = parseFloat(totalDespFixaResult.Tot_Desp_Fixa) || 0;
      const totalRecVar = parseFloat(totalRecVarResult.Tot_Rec_Var) || 0;
      const totalRecFixa = parseFloat(totalRecFixaResult.Tot_Rec_Fixa) || 0;
      
      const totalDespesas = totalDespFixa + totalDespVar;
      const totalReceitas = totalRecFixa + totalRecVar;
      const valorBalanco = totalReceitas - totalDespesas;

      const balanco = {
        ID_Usuario: user.id,
        Total_Receitas: totalReceitas,
        Total_Despesas: totalDespesas,
        Mes: mesAtual,
        Ano: anoAtual,
        Valor_Balanco: valorBalanco
      }

      await database("Balanco_Mensal").insert(balanco);
    }
    
    console.log(`==BALANÇOS DO MÊS ${mesAtual} DE ${anoAtual} GERADOS==`);
    

  } catch (error) {
    console.error('Erro ao gerar balanço mensal:', error);
  } 
}

async function viraMes(){
    schedule.scheduleJob('0 0 1 * *', geraBalanco);
    schedule.scheduleJob('0 0 1 * *', limparDespesas);
    schedule.scheduleJob('0 0 1 * *', limparReceitas);
    //schedule.scheduleJob(new Date(Date.now() + 100), geraBalanco);
    //schedule.scheduleJob(new Date(Date.now() + 100), limparDespesas);
    //schedule.scheduleJob(new Date(Date.now() + 100), limparReceitas);
}

module.exports = {
    viraMes
};