const database = require('../../database/index');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// Cria hash da senha
async function HashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

function validaUpdate(nome, username, senha, senhaConfirmacao) {
  const schema = Joi.object({
    nome: Joi.string(),
    username: Joi.string().min(3).max(30),
    senha: Joi.string().min(4),
    senhaConfirmacao: Joi.string().valid(Joi.ref('senha')),
  });

  const usuario = { nome, username, senha, senhaConfirmacao };
  return schema.validate(usuario, { abortEarly: false });
}

function validaCadastro(nome, username, email, senha, senhaConfirmacao) {
  const schema = Joi.object({
    nome: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(4).required(),
    senhaConfirmacao: Joi.string().valid(Joi.ref('senha')).required(),
  });

  const usuario = { nome, username, email, senha, senhaConfirmacao };
  return schema.validate(usuario, { abortEarly: false });
}

async function update(id, nome, username, senha, senhaConfirmacao) {
  try {
    const usuario = await database("usuario")
      .select("*")
      .where("id", id)
      .first();

    if (!usuario) {
      throw new Error("Usuário não encontrado!");
    }

    if(username){
      const userUsername = await database("Usuario")
        .select("*")
        .where({ Username: username })
        .first();
      if (userUsername) {
        throw new Error("Username indisponível!");
      }
    }

    let camposSenha = senha ? (senhaConfirmacao ? false : true ) : false; 
    if(camposSenha){
      throw new Error("Os campos se senha precisam ser ou ambos ou nenhum preenchido");
    }

    const { error } = validaUpdate(nome, username, senha, senhaConfirmacao);
    if (error) {
      const customErrors = error.details.map(err => err.message);
      return {
        status: false,
        message: customErrors,
      };
    }

    const updatedUser = {
      nome: nome,
      username: username,
      Senha: senha?await HashPassword(senha):undefined, // Hash da nova senha (se ela for informada)
    };

    await database("usuario")
      .update(updatedUser)
      .where("id", id);

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

async function readOne(id) {
  try {
    const usuario = await database('usuario')
      .select("*")
      .where("id", id)
      .first();

    if (usuario == null) {
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

async function deletarUsuario(id) {
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

async function cadastrarUsuario(nome, username, email, senha, senhaConfirmacao) {
  try {
    const userEmail = await database("Usuario")
      .select("*")
      .where({ Email: email })
      .first();
    if (userEmail) {
      throw new Error("Endereço de e-mail já cadastrado!");
    }

    const userUsername = await database("Usuario")
      .select("*")
      .where({ Username: username })
      .first();
    if (userUsername) {
      throw new Error("Username indisponível!");
    }

    const { error } = validaCadastro(nome, username, email, senha, senhaConfirmacao);
    if (error) {
      const customErrors = error.details.map(err => err.message);
      return {
        status: false,
        message: customErrors,
      };
    }

    const hash = await HashPassword(senha);
    const newUser = {
      Username: username,
      Email: email,
      Nome: nome,
      Senha: hash,
    };

    const insertedUser = await database("Usuario").insert(newUser);
    const idUser = insertedUser[0]; // Referencia ao usuario novo

    //DEFINE LIMITE
    const data = new Date();
    const [mesAtual, anoAtual] = [data.getMonth() + 1, data.getFullYear()];

    const limite = {
      ID_Usuario: idUser,
      Valor_Limite: 0, //default: R$00,00
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