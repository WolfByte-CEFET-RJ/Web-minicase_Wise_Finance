const database = require('../../database/index');
const bcrypt = require('bcrypt');

// Função para gerar um hash de senha
async function HashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function update(id, nome, username){
    try {
        const usuario = await database("usuario")
        .select("*")
        .where("id", id)
        .first();
        
        if (!usuario) {
          throw new Error("Usuário não encontrado!");
        }

        //EM CASO DE async function update(id, nome, username, email, senha, senhaConfirmacao)
        /*if (senha.length < 4) {
          throw new Error("Senha muito curta!");
        }
    
        if (senha !== senhaConfirmacao) {
          throw new Error("As senhas precisam ser iguais.");
        }
    
        const userEmail = await database("Usuario")
          .select("*")
          .where({ Email: email })
          .first();
        if (userEmail) {
          throw new Error("Endereço de e-mail já cadastrado!");
        }

        const hash = await HashPassword(senha);
        */
        const updatedUser = {
          nome: nome,
          username: username
        }

        await database("usuario")
        .update(updatedUser)
        .where("id",id);
        
        return {
          status: true,
          message: "Informações atualizadas!",
        };
      } catch (error) {
          console.log(error);
        return {
          status: false,
          message: error["message"]
        };
      }
}

async function readOne(id){
    try { 
        const usuario = await database('usuario')
        .select("*")
        .where("id",id)
        .first();

        if(usuario==null){
            throw new Error("Usuário não encontrado");
        }
        
        return {
            status: true,
            usuario
        };
    } catch (error) {
        return {
            status: false,
            message: error["message"]
        };
    }
}

async function deletarUsuario(id){
  try {
    const user = await database("Usuario").select("*").where({ ID: id });

    if (user.length === 0) {
      throw new Error("User not found!");
    }

    // Excluir registros relacionados em outras tabelas
    await database("Despesa_Fixa").where({ ID_Usuario: id }).delete();
    await database("Despesa_Variavel").where({ ID_Usuario: id }).delete();
    await database("Receita_Fixa").where({ ID_Usuario: id }).delete();
    await database("Receita_Variavel").where({ ID_Usuario: id }).delete();
    await database("Limite_Mensal").where({ ID_Usuario: id }).delete();
    await database("Balanco_Mensal").where({ ID_Usuario: id }).delete();
    await database("Relatorio_Mensal").where({ ID_Usuario: id }).delete();

    // Finalmente, excluir o usuário
    await database("Usuario").where({ ID: id }).delete();

    return {
      status: true,
      message: "Usuário deletado!",
    };
  } catch (error) {
    console.log(error);

    return {
      status: false,
      message: error.message,
    };
  }
}

async function cadastrarUsuario( nome, username, email, senha, senhaConfirmacao){
  try {
    if (
      !nome ||
      !username ||
      !email ||
      !senha ||
      !senhaConfirmacao
    ) {
      throw new Error("Preencha todos os campos obrigatórios.");
    }

    if (senha.length < 4) {
      throw new Error("Senha muito curta!");
    }

    if (senha !== senhaConfirmacao) {
      throw new Error("As senhas precisam ser iguais.");
    }

    const userEmail = await database("Usuario")
      .select("*")
      .where({ Email: email })
      .first();
    if (userEmail) {
      throw new Error("Endereço de e-mail já cadastrado!");
    }

    const hash = await HashPassword(senha);
    const newUser = {
      Username: username,
      Email: email,
      Nome: nome,
      Senha: hash,
    };

    const insertedUser = await database("Usuario").insert(newUser);
    const idUser = insertedUser[0]; // Assume que o retorno inclui o ID inserido

    //DEFINE LIMITE
    const data = new Date();
    const [mesAtual, anoAtual] = [data.getMonth() + 1, data.getFullYear()];

    const limite = {
      ID_Usuario: idUser,
      Valor_Limite: 0, //default : R$00,00
      Mes_Definido: mesAtual,
      Ano_Definido: anoAtual,
  };

  await database("Limite_Mensal").insert(limite);

    return {
      status: true,
      message: "Usuário cadastrado com êxito",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = { 
    cadastrarUsuario,
    deletarUsuario,
    readOne,
    update
 };