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

exports.index = (req, res) =>{
  res.render('index');
}
exports.show = async (req, res) =>{
    const banco = await connection();
    const [ conteudos ] = await banco.execute('SELECT * FROM conteudo;')
    res.render('upload',{
      conteudos: conteudos
    });
}

exports.addPDF = async (req, res) =>{
  let {pdfTitle, pdfURL} = req.body;
  
  const driveFileRegex = /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/(view|preview)(\?.*)?$/;
  const shareLinkRegex = /^https:\/\/drive\.google\.com\/open\?id=([\w-]+)/;

  if (!driveFileRegex.test(pdfURL)) {
    const match = pdfURL.match(shareLinkRegex);
    
    if (match && match[1]) {
      const fileId = match[1];
      pdfURL = `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  const banco = await connection();
  await banco.execute('INSERT INTO materiais(titulo, material, type, id_professor) '
    +'VALUES(?,?,?,?)', [pdfTitle, pdfURL, 0, 1]);
  res.redirect('/');

}

exports.addVideo = async (req, res) => {  
  let { videoTitle, videoURL } = req.body;

  // Verificação e conversão para link embed do YouTube
  const embedRegex = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/;
  const watchRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/;
  const shortRegex = /^https:\/\/youtu\.be\/([\w-]+)/;

  if (!embedRegex.test(videoURL)) {
    const match =
      videoURL.match(watchRegex) ||
      videoURL.match(shortRegex);

    if (match && match[1]) {
      const videoId = match[1];
      videoURL = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  const banco = await connection();
  await banco.execute('INSERT INTO materiais(titulo, material, type, id_professor) '
    +'VALUES(?,?,?,?)', [videoTitle, videoURL, 1, 1]);
  res.redirect('/');
};


exports.addQuestao = async (req, res) =>{
    const { id_conteudo, tipo_questao, enunciado, respCE } = req.body;
    const  { altA, altB, altC, altD, correta} = req.body;
    const banco = await connection();
    await banco.execute('INSERT INTO questao (`id_conteudo`, `sentence`, `type`)'
      +'VALUES (?,?,?)', [ id_conteudo, enunciado, tipo_questao]);

      if(tipo_questao == 2){
        let answer = 0;
        if(correta == 'A'){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ altA,  answer, 'A']);
        answer = 0;
        if(correta == 'B'){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ altB,  answer, 'B']);
          answer = 0;
        if(correta == 'C'){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ altC, answer, 'C']);
        answer = 0;
        if(correta == 'D'){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ altD, answer, 'D']);
        answer = 0;
      }else{
        let answer = 0;
        if(respCE == 1){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ 'Certo', answer, 'A' ]);
        answer = 0
        if(respCE == 0){ answer = 1}
        await banco.execute('INSERT INTO alternativas (`id_questao`, `sentence`, `answer`, `letter`)'
        +'VALUES ((SELECT id_questao FROM questao ORDER BY id_questao DESC LIMIT 1),?,?,?)', [ 'Errado', answer, 'B' ]);
        answer = 0
      }

  res.redirect('/');
}


