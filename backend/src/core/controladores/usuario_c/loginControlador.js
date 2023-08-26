const { loginUsuario } = require('../../servicos/usuario_s/loginServico');
/*const jwt = require("jsonwebtoken");
const { ComparePassword } = require("../../../utils/secure");  */

async function loginControlador(req, res) {
  const { identificador, senha } = req.body;

  loginUsuario(identificador, senha, res)  // Corrija o nome da função para loginUsuario.
    .then(loginService => {
      if (loginService.status) {
        const tokenPayload = {
          InformacoesUsuario: {
            id: loginService.usuario.id,
            nome: loginService.usuario.nome,
            email: loginService.usuario.email,
          },
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_KEY || "", {
          expiresIn: "48h",
        });

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
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
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Erro ao processar o login",
      });
    });
}

module.exports = { loginControlador };
