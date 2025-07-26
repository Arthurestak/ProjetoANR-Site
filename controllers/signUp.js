const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});


exports.index = (req, res) =>{
    res.render('signup');
}

exports.show = (req, res) =>{
    const { name, email, password } = req.body;
    const query = 'INSERT INTO pessoa (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err) => {
    if (err) {
        req.flash('errors', 'Erro ao cadastrar usuário. Tente novamente.');
    
        return res.redirect('/signup');
    }
    req.flash('success', 'Cadastro realizado com sucesso! Faça login abaixo.');
 
    res.redirect('/login');
    })
}