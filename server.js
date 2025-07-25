require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
// ROTAS
const questionRoutes = require('./routes/questionRoutes');
const ebookRoutes = require('./routes/ebookRoutes');
const mentoriaRoutes = require('./routes/mentoriaRoutes');

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


// EJS CONFIGURAÇÃO
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PÁGINAS ESTÁTICAS
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => {
    // Apenas renderiza — não consome a flash
    res.render('login');
});
app.get('/signup', (req, res) => res.render('signup'));
app.get('/codigoComentado', (req, res) => res.render('codigoComentado'));
app.get('/avisos', (req, res) => res.render('avisos'));
app.get('/contato', (req, res) => res.render('contato'));
app.get('/enac2025-2', (req, res) => res.render('enac2025-2'));

// FORMULÁRIOS: Cadastro e Login
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO pessoa (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err) => {
        if (err) {
            req.flash('error', 'Erro ao cadastrar usuário. Tente novamente.');
            return res.redirect('/signup');
        }
        req.flash('success', 'Cadastro realizado com sucesso! Faça login abaixo.');
        res.redirect('/login');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
        if (err || result.length === 0) {
            req.flash('error', 'Email ou senha incorretos.');
            return res.redirect('/login');
        }
        req.flash('success', 'Login bem-sucedido!');
        res.redirect('/');
    });
});

// ROTAS EXTERNAS
app.use(questionRoutes);
app.use(ebookRoutes);
app.use(mentoriaRoutes);

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { checkCsrfError } = require('./middlewares/middleware');
app.use(checkCsrfError);

// MATERIAIS
app.use('/materiais.json', express.static(path.join(__dirname, 'Professor-Dashboard/materiais.json')));
app.use('/uploads', express.static(path.join(__dirname, 'Professor-Dashboard/public/uploads')));

// SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
