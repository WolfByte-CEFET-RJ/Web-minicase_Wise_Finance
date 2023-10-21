async function logoutControlador(req = request, res = response) {
    try {
    res.cookie("access_token", '', { expires: new Date(0) });

    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
  
    res.json({
        status: true,
        message: "Logout bem-sucedido",
    });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Ocorreu um erro ao realizar o logout",
      });
    }
  }
  
  module.exports = { logoutControlador };