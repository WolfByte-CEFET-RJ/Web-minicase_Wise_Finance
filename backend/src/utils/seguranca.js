const bcrypt = require('bcrypt');

async function comparePassword(inputPassword, hashedPassword) {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Erro ao comparar senhas");
  }
}

module.exports = { comparePassword };
