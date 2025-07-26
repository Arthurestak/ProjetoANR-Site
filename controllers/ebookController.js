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

// PÁGINA INICIAL DOS EBOOKS
exports.index = async (req, res) => {
  try {
    const banco = await connection();
    const [ebooks] = await banco.execute('SELECT * FROM materiais');

    res.render('ebook', { ebooks });

  } catch (error) {
    console.error('Erro ao buscar ebooks:', error);
    res.status(500).send('Erro ao carregar ebooks.');
  }
};

// DESCRIÇÃO INDIVIDUAL DO EBOOK
exports.show = async (req, res) => {
  const id = req.params.id;

  try {
    const banco = await connection();
    const [result] = await banco.execute(
      'SELECT * FROM materiais WHERE id_material = ?',
      [id]
    );

    if (!result[0]) {
      return res.status(404).send('Ebook não encontrado');
    }

    res.render('ebook', { ebook: result[0] });

  } catch (error) {
    console.error('Erro ao carregar detalhes do ebook:', error);
    res.status(500).send('Erro interno do servidor');
  }
};
