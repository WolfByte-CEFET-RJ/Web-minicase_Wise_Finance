require('dotenv').config();
const jwt = require("jsonwebtoken")

//Bearear token
function auth(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.json({"message" : "Nenhum token fornecido"})
    }

    const parts = authHeader.split(" ")
    // [Bearer, token]
    if(parts.length != 2){
        return res.json({"message" : "Token inválido"})
    }
    
    const [schema, token] = parts
    
    if(schema != "Bearer") {
        return res.json({"message" : "Token mal formatado"})
    }


    //const decoded = jwt.verify(token, process.env.JWT_KEY); // Substitua pela sua chave secreta real
    //console.log('Informações do usuário:', decoded);

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) {
          return res.json({ message: "Erro ao verificar token" });
        }
    
        req.usuario = decoded;
        //console.log(decoded);
        next();
      });
}

module.exports = auth