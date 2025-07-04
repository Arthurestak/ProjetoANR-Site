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

// renderizando a pagina materias
exports.index = async (req, res) => {
  const banco = await connection();
  const [titles] = await banco.execute('SELECT * FROM subjects;');
  const [subjectsId1] = await banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 1;')
  const [subjectsId2] = await banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 2;')
  const [subjectsId3] = await banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 3;')

  res.render('materias', {
    firstTitle: titles[0].name,
    secondTitle: titles[1].name,
    thirdTitle: titles[2].name,
    subjects1: subjectsId1,
    subjects2: subjectsId2,
    subjects3: subjectsId3
  });

};

exports.contentScreen = async (req, res) => {
  const id_sub_subject = req.params.id;

  try {
    const banco = await connection();
    const [conteudos] = await banco.execute(
      'SELECT * FROM content WHERE id_sub_subject = ?',
      [id_sub_subject]
    );

    res.render('conteudos', {
      conteudos,
      id_sub_subject
    });

  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

exports.questionScreen = async (req, res) => {
  const { id_content, id_question } = req.params;

  try {
    const banco = await connection();
    const [questoes] = await banco.execute(
      'SELECT * FROM questions WHERE id_content = ?',
      [id_content]
    );

    const questaoSelecionada = questoes.find(q => q.id_question == id_question);

    if (!questaoSelecionada) {
      return res.status(404).send('Questão não encontrada');
    }

    res.render('questao', {
      questao: questaoSelecionada,
      id_content
    });

  } catch (error) {
    console.error('Erro ao buscar questão:', error);
    res.status(500).send('Erro interno do servidor');
  }
};

exports.indexQuestion = async (req, res) => {
  const arrowId = req.body.arrow;
  const id_question = req.body.id_question;
  const id_content = req.body.id_content;
  const direction = Number(id_question) + Number(arrowId);
 
  try {
    const banco = await connection();
    const [questao] = await banco.execute(
      `SELECT * FROM questions WHERE id_question = ${direction} AND id_content = ${id_content}`,

    );

    const questaoSelecionada = questao.find(q => q.id_question);
    if(!questaoSelecionada){
      
      return res.send('temo ainda nao');
    }
    res.render('questao', {
      questao: questaoSelecionada,
      direction,
      id_content
    });

  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    res.status(500).send('Erro interno do servidor');
  }
}

exports.answerTretment = async (req, res) => {
  const id_question = req.body.id_question;
  const id_content = req.body.id_content;
  const id_answer = req.body.answer;
  console.log(id_question);

  if (!id_answer) {
    req.flash('error', 'Selecione uma alternativa');
    return res.redirect(`/questao/${id_content}/${id_question}`);


  }

  try {
    const banco = await connection();
    const answer = await banco.execute(
      'SELECT answer FROM questions WHERE id_question = ?',
      [id_question]
    );

    if (answer[0][0].answer != id_answer) {
      req.flash('error', 'Você errou a resposta.');
      return res.redirect(`/questao/${id_content}/${id_question}`);

    }
    req.flash('success', 'Você acertou a resposta.');
    res.redirect(`/questao/${id_content}/${id_question}`);


  } catch (error) {
    console.error('Erro ao buscar conteúdos:', error);
    res.status(500).send('Erro interno do servidor');
  }
}