const database = require('../../database/index');
const jwt = require("jsonwebtoken"); 
const { comparePassword } = require("../../utils/seguranca");

async function loginUsuario(identificador, senha, res) {
  try {
    let consultaUsuario = database("usuario").select("*");
    if (identificador.includes("@")) {
      consultaUsuario = consultaUsuario.where({ email: identificador});
    } else {
      consultaUsuario = consultaUsuario.where({ nome: identificador});
    }

    const usuario = await consultaUsuario.first();

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const verificarSenha = await comparePassword(senha, usuario.Senha);
    if (!verificarSenha) {
      throw new Error("Senha inválida");
    }

    const tokenPayload = {
      InformacoesUsuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_KEY || "", {
      expiresIn: "48h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: true,
      message: "Login realizado com sucesso",
      usuario: {
        id: usuario.ID,
        nome: usuario.Nome,
        email: usuario.Email,
      },
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