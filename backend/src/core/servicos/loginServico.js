require('dotenv').config();
const database = require('../../database/index');
const jwt = require("jsonwebtoken"); 
const { comparePassword } = require("../../utils/seguranca");

async function loginUsuario(identificador, senha) {
  try {
    let consultaUsuario = database("usuario").select("*");
    if (identificador.includes("@")) {
      consultaUsuario = consultaUsuario.where({ email: identificador});
    } else {
      consultaUsuario = consultaUsuario.where({ username: identificador});
    }

    const usuario = await consultaUsuario.first();

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const verificarSenha = await comparePassword(senha, usuario.Senha);
    if (!verificarSenha) {
      throw new Error("Senha inválida");
    }

    // Cria o token JWT
    const tokenPayload = {
      InformacoesUsuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
      },
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_KEY, {
      expiresIn: "48h",
    });

    // Retorna o token JWT
    return {
      status: true,
      message: "Login realizado com sucesso",
      usuario: {
        id: usuario.ID,
        username: usuario.Username,
        email: usuario.Email,
      },
      token: token, // Adiciona o token JWT ao objeto de retorno
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: error.message,
    };
  }
}

module.exports = { loginUsuario };
