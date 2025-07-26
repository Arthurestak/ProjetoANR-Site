const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

exports.index = (req, res) =>{
    res.render('login');
}
exports.show = async (req, res) =>{
    const { email, senha } = req.body;
    const query = 'SELECT * FROM pessoa WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, result) => {

        if (err || result.length === 0) {
            req.flash('errors', 'Email ou senha incorretos.');
            return res.redirect('/login');
            
        }
        const usuario = [email, senha];
        req.session.user = usuario;
        req.flash('success', 'Login bem-sucedido!');
        res.redirect('/');
});
}