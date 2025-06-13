const mysql = require('mysql2/promise');

exports.query = async () =>{
    const banco = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'senac',
        database: 'anr_database',
        port: 3306
    });
    const [ titles ]= await banco.execute('SELECT * FROM subjects;');
    const [ subjects ] = await  banco.execute('SELECT * FROM sub_subjects WHERE id_subject = 1;') 
    

    return [ titles];
}
// renderizando a pagina materias
exports.index = async (req, res) => {
    const [ titles ] = await this.query();
   // const [ subjects ] = await this.query();
    // const [ subjectsId1 ] = [ subjects ];
    // console.log([ subjectsId1.name ]);

    res.render('materias', {
            firstTitle: titles[0].name,
            secondTitle: titles[1].name,
            thirdTitle: titles[2].name
    });
};
