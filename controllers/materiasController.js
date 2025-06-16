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
    const [ titles ]= await banco.execute('SELECT * FROM subjects;'); 
    const [ subjectsId1 ] = await  banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 1;') 
    const [ subjectsId2 ] = await  banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 2;') 
    const [ subjectsId3 ] = await  banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 3;') 
    
    res.render('materias', {
            firstTitle: titles[0].name,
            secondTitle: titles[1].name,
            thirdTitle: titles[2].name,
            subjects1: subjectsId1,
            subjects2: subjectsId2,
            subjects3: subjectsId3

            
    });

};

// exports.contentScreen = async (req, res) =>{
    
//     const { id_sub_subject } = await req.params.id;
//     console.log('ID retornado:', id_sub_subject);
    
//     const banco = await connection();
//     [ query ] = await banco.execute(`SELECT * FROM content WHERE id_sub_subject = ${id_sub_subject};`);
    
//     res.render('conteudos', {
//         conteudo: query.name
//     });
//     console.log('recebi o id', id_sub_subject);
// };


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
