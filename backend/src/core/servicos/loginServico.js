require('dotenv').config();
const database = require('../../database/index');
const jwt = require("jsonwebtoken"); 
const { comparePassword } = require("../../utils/seguranca");
const Joi = require('joi');

function validaLogin(identificador, senha) {
  const schema = Joi.object({
    identificador: Joi.string().required(),
    senha: Joi.string().min(4).required()
  });

  const usuario = { identificador, senha };
  return schema.validate(usuario, { abortEarly: false });
}

async function loginUsuario(identificador, senha) {
  try {

    const { error } = validaLogin(identificador, senha);
    if (error) {
      const customErrors = error.details.map(err => err.message);
      return {
        status: false,
        message: customErrors,
      };
    }

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

    const tokenPayload = {
        id: usuario.ID,
        username: usuario.Username,
        email: usuario.Email,
    };

    const token = jwt.sign(
      tokenPayload, 
      process.env.JWT_KEY, 
      {expiresIn: "48h"}
    );

    return {
      status: true,
      message: "Login realizado com sucesso",
      //retona o token
      token: token
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
