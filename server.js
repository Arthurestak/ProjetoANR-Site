require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// ROTAS
const materiasRoutes = require('./routes/materiasRoutes');
const ebookRoutes = require('./routes/ebookRoutes');

const app = express();

// BANCO DE DADOS
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('✅ Banco de dados conectado com sucesso!');
    }
});

// SESSÃO E FLASH
app.use(session({
    secret: 'segredo-super-seguro',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS CONFIGURAÇÃO
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PÁGINAS ESTÁTICAS
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/codigoComentado', (req, res) => res.render('codigoComentado'));

// ROTA FORMULÁRIOS
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.send('Erro ao cadastrar.');
        }
        res.redirect('/login');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
        if (err || result.length === 0) {
            console.error('Erro ao autenticar usuário:', err);
            return res.send('Login inválido.');
        }
        res.send('Login bem-sucedido!');
    });
});

// ROTAS EXTERNAS
app.use(materiasRoutes);
app.use(ebookRoutes);

// SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
