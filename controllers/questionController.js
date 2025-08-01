const mysql = require('mysql2/promise');

async function connection() {
  const banco = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
  });

  return banco;
}

exports.index = async (req, res) =>{
    const banco = await connection();
    const [ questions ] = await banco.execute('SELECT * FROM questao;');
    const [ alternatives ] = await banco.execute('SELECT * FROM alternativas;')
    const [ conteudos ] = await banco.execute('SELECT * FROM conteudo;')
    const [ discplinas ] = await banco.execute('SELECT * FROM disciplina;')
    
    res.render('questions', {
      disciplinas: discplinas,
      conteudos: conteudos,
      questions: questions,
      alternatives: alternatives
    });   
}  

