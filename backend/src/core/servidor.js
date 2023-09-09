require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require("express")
const servidor = express()
servidor.use(express.json())

//PREDEFINIÇÃO DAS ROTAS
const rotas = require("./rotas")
servidor.use('', rotas)


servidor.listen(port, host, () => {
    console.log(`Servidor inicializado em http://${host}:${port}`);
});