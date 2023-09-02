const database = require('../../database/index');
/*const { ComparePassword } = require("../../../utils/secure");
const jwt = require("jsonwebtoken");*/

async function loginUsuario(identificador, senha, res) {
  try {
    // Verifica se o identificador é um email ou um nome de usuário
    let consultaUsuario = database("usuario").select("*");
    if (identificador.includes("@")) {
      consultaUsuario = consultaUsuario.where({ email: identificador, ativo: 1 });
    } else {
      consultaUsuario = consultaUsuario.where({ nome_de_usuario: identificador, ativo: 1 });
    }
    
    const usuario = await consultaUsuario.first();
    
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const verificarSenha = await ComparePassword(senha, usuario.senha);
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