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

    jwt.verify(token, process.env.JWT_KEY, (error)=> {
        if(error){
            return res.json({"message" : "Erro ao inverter token"})
        }
        return next()
    })
}

module.exports = auth