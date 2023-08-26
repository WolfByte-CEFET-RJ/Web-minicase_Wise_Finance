const knex = require('knex');
const knexConfig = require('../../../config/conexao_db');
const database = knex(knexConfig.development);
const bcrypt = require('bcrypt');

// Função para gerar um hash de senha
async function HashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function cadastrarUsuario(
  nome,
  username,
  email,
  senha,
  senhaConfirmacao
) {
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

module.exports = { cadastrarUsuario };
