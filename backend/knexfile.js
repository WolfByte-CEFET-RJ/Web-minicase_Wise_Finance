require('dotenv').config();

const knexConfig = {
  client: 'mysql2',
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DB_NAME, 
      user: process.env.DB_USER, 
      password: process.env.DB_PASS,
      port: process.env.DB_PORT
    },
    migrations: {
      tableName: "migrations",
      directory: './src/database/migrations'
  }
  }
};

module.exports = knexConfig;
