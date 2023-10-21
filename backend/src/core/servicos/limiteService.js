const database = require('../../database/index');

//VERIFICA QUANDO LIMITE OU DESPESAS SÃO ALTERADAS
async function verificaLimite(userId){
  try {
    const [totalFixaResult, totalVarResult, limite] = await Promise.all([
      database("Despesa_Fixa").sum("Valor as Tot_Desp_Fixa").where("id_usuario", userId).first(),
      database("Despesa_Variavel").sum("Valor as Tot_Desp_Var").where("id_usuario", userId).first(),
      database("limite_mensal").select("Valor_Limite").where("id_usuario", userId).first()
    ]);

    const totalFixa = parseFloat(totalFixaResult.Tot_Desp_Fixa) || 0;
    const totalVar = parseFloat(totalVarResult.Tot_Desp_Var) || 0;

    const soma = totalFixa + totalVar;

    if (soma > parseFloat(limite.Valor_Limite)) {
      return{
        verificacao: "VALOR DO LIMITE ULTRAPASSADO"
      }
    } else{
      return{
        verificacao: "NOTIFY: DENTRO DO LIMITE"
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }

}

async function define(id_user, valor){
    try {
        const usuario = await database("usuario")
        .select("*")
        .where("id", id_user)
        .first();
        
        if (!usuario) {
          throw new Error("Usuário não encontrado!");
        }

        const verificaExistenciaDoLimite = await database("limite_mensal")
        .select("*")
        .where("id_usuario", id_user)
        .first();
        
        if (!verificaExistenciaDoLimite) {
          throw new Error("Limite não definido!");
        }

        const data = new Date();
        const [mesAtual, anoAtual] = [data.getMonth() + 1, data.getFullYear()];

        const limite = {
            ID_Usuario: id_user,
            Valor_Limite: valor,
            Mes_Definido: mesAtual,
            Ano_Definido: anoAtual,
        };

        await database("Limite_Mensal").update(limite).where("id_usuario",id_user);
    
      return {
        status: true,
        message: `Limite de R$${valor} definido ao usuario ${id_user}`,
        limite: await verificaLimite(id_user)
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
   }
}

async function readByUsuario(id_user){
  try {
      const limite = await database("Limite_Mensal")
      .select('*')
      .where("id_usuario", id_user)
      .first();

      if(limite==null){
        throw new Error("Erro inesperado. Limite não encontrado.");
    }

    return {
      status: true,
      limite
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
 }
}
  
  module.exports = { 
      define,
      readByUsuario,
      verificaLimite
};