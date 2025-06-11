const mysql = require('mysql2/promise');

class SubSubjects{
    
    async assignment(){
        const banco = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'senac',
            database: 'anr_database',
            port: 3306
        });
        
        const [ rows ] = await banco.execute('SELECT * FROM subjects;');
        return [ rows ];
       
    }
}

module.exports = SubSubjects;