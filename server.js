    const routes = require('./routes');
    require('dotenv').config();
    const mysql = require('mysql2');
    const express = require('express');
    const path = require('path');
    const session = require('express-session'); 
    const flash = require('connect-flash');
    const app = express();

    // Configuração do Express
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    // // Configuração do banco de dados
    const db =  mysql.createConnection({
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
            console.log('Conectado ao banco de dados!');
        }
    });

    // Configuração de session
    const sessionOptions = session({
    secret: 'segredo-super-seguro',
    resave: true,
    saveUninitialized: true
    });

    // Rotas de renderização
    app.get('/', (req, res) => res.render('index'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/signup', (req, res) => res.render('signup'));
    app.use(sessionOptions);    
    app.use(flash());   
    app.use((req, res, next) => {
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
        next();
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(routes);

    // Rota para processar cadastro
    app.post('/signup', (req, res) => {
        const { name, email, password } = req.body;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                res.send('Erro ao cadastrar.');
            } else {
                res.redirect('/login');
            }
        });
    });
    // Rota para processar login
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        db.query(query, [email, password], (err, result) => {
            if (err || result.length === 0) {
                console.error('Erro ao autenticar usuário:', err);
                res.send('Login inválido.');
            } else {
                res.send('Login bem-sucedido!');
            }
        });
    });


    // Iniciar servidor
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });