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
    const [ videos ] = await banco.execute('SELECT * FROM materiais WHERE type = 1;');
    const [ pdfs ] = await banco.execute('SELECT * FROM materiais WHERE type = 0;');
    res.render('enac2025-2', {
            videos: videos,
            pdfs: pdfs
      })
}
