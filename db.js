const fs = require('fs');
if (!fs.existsSync('.env')) {
  console.warn('⚠️ Arquivo .env não encontrado na raiz do projeto!');
}

require('dotenv').config();

const mysql = require('mysql2');

// 🔍 Verificação das variáveis de ambiente
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Variável de ambiente ${key} não está definida.`);
  }
});

// 🛠️ Criação da conexão
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 🔄 Tentativa de conexão
connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:');
    console.error(`Código: ${err.code}`);
    console.error(`Mensagem: ${err.message}`);
    process.exit(1); // Encerra o processo se a conexão falhar
  } else {
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
  }
});

module.exports = connection;