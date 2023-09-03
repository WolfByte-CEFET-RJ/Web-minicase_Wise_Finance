const crypto = require('crypto');
const jwtKey = crypto.randomBytes(32).toString('hex'); // Gera uma chave JWT de 256 bits (32 bytes) em formato hexadecimal
console.log("Chave JWT gerada: ", jwtKey);