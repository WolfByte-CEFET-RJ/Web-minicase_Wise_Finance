require('dotenv').config();
const temporizador = require("../utils/temporizador")
const host = process.env.HOST;
const port = process.env.PORT;






const express = require("express")
const servidor = express()
servidor.use(express.json())

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
servidor.use(cors(corsOptions));

//PREDEFINIÇÃO DAS ROTAS
const rotas = require("./rotas")
servidor.use('', rotas)

temporizador.viraMes();


servidor.listen(port, host, () => {
    console.log(`Servidor inicializado em http://${host}:${port}`);
});