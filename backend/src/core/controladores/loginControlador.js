const jwt = require("jsonwebtoken");  
const { loginUsuario } = require('../servicos/loginServico');

async function loginControlador(req, res) {
  const { identificador, senha } = req.body;

  try {
    const loginService = await loginUsuario(identificador, senha);

    if (loginService.status) {
      // Define o token JWT como um cookie
      res.cookie("access_token", loginService.token, {
        httpOnly: false,
        secure: false,
      });

      res.json({
        success: true,
        message: loginService.message,
      });
    } else {
      res.status(401).json({
        success: false,
        message: loginService.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erro ao processar o login",
    });
  }
}

module.exports = { loginControlador };
