//ARQUIVO COM TODAS AS FUNCIONALIDADES TEMPORIZADAS
const schedule = require('node-schedule');
const database = require('../database/index');
const { gerarRelatorioServico } = require('../core/servicos/relatorioServico');
const { aumentaSaldo } = require('../core/servicos/saldoGeralServico')

async function limparDespesas() {
  try {
    await database("Despesa_Variavel").delete();
    await database('Usuario').update({ Desp_Var_Total: 0 });
    console.log('Despesas excluídas com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir despesas:', error);
  } 
}

async function limparReceitas() {
    try {
      await database("Receita_Variavel").delete();
      await database('Usuario').update({ Rec_Var_Total: 0 });
      console.log('Receitas excluídas com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir receitas:', error);
    } 
}

async function geraRelatorioMensal() {
  try {
    const usuarios = await database("Usuario").select("id");

    if(!usuarios){
      throw new Error("Não há usuários");
    }

    const dataAtual = new Date();
    //const mesAtual = 2;
    const mesAtual = dataAtual.getMonth() + 1; 
    const anoAtual = dataAtual.getFullYear(); 

    for (const user of usuarios) {
      const caminhoRelatorio = await gerarRelatorioServico(user.id, mesAtual, anoAtual);

      console.log(`Relatório gerado com sucesso: ${caminhoRelatorio}`);
    }

    //atualizando saldo só depois que o mes é gerado
    atualizaSaldo()

  } catch (error) {
    console.error('Erro ao gerar o relatório mensal:', error);
  }
}

async function atualizaSaldo(){
  const usuarios = await database("Usuario").select("id");

    if(!usuarios){
      throw new Error("Não há usuários");
    }

    for (const user of usuarios) {
      const [ totalDespFixaResult,  totalRecFixaResult] = await Promise.all([
        database("Despesa_Fixa").sum("Valor as Tot_Desp_Fixa").where("id_usuario", user.id).first(),
        database("Receita_Fixa").sum("Valor as Tot_Rec_Fixa").where("id_usuario", user.id).first(),
      ]);

      const totalDespFixa = parseFloat(totalDespFixaResult.Tot_Desp_Fixa) || 0;
      const totalRecFixa = parseFloat(totalRecFixaResult.Tot_Rec_Fixa) || 0;

      const atulizaFixas = totalRecFixa - totalDespFixa;

      await aumentaSaldo(user.id, atulizaFixas);
    }

    console.log(`==SALDOS ATUALIZADOS==`);

      //limpando receitas e despesas variáveis soemnte depois do relatorios estar gerado
      limparDespesas();
      limparReceitas();
}

async function geraBalanco(){
  try {
    const usuarios = await database("Usuario").select("id");

    if(!usuarios){
      throw new Error("Não há usuários");
    }

    const timer = new Date();
    //const mesAtual = 2;
    const mesAtual = dataAtual.getMonth() + 1;
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
    
    // gerando os relatorios somente depois de todos os balanços estarem prontos
    geraRelatorioMensal();
    
  } catch (error) {
    console.error('Erro ao gerar balanço mensal:', error);
  } 
}

/* 
 as funções mais a direita são chamadas na função imediatamente à esquerda 
 balanco --> relatorio --> atualiza saldo --> limpar variáveis (despesas e receitas)
*/
async function viraMes(){
    schedule.scheduleJob('0 0 1 * *', geraBalanco);
    //schedule.scheduleJob(new Date(Date.now() + 100), geraBalanco);
}

module.exports = {
    viraMes
};