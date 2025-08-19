require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

// 🛢️ Conexão com MySQL
const db = require('./db'); // importa a conexão do arquivo db.js

const app = express();

// 🔐 Verificação de variável de sessão
if (!process.env.SECRET_SESSIONS) {
  console.warn('⚠️ Variável SECRET_SESSIONS não definida no .env');
}

// 🌐 CORS
const whiteList = ['http://localhost:3002', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// 🧠 Middlewares globais
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 💾 Sessão e Flash
app.use(session({
  secret: process.env.SECRET_SESSIONS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 dias
    httpOnly: true
  }
}));
app.use(flash());

// 🎨 EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 🔒 Middlewares personalizados
const { checkCsrfError, middlewareGlobal, notFound } = require('./middlewares/middleware');
app.use(middlewareGlobal);

// 📦 Rotas
app.use(require('./routes/questionRoutes'));
app.use(require('./routes/ebookRoutes'));
app.use(require('./routes/mentoriaRoutes'));
app.use(require('./routes/enacRoutes'));
app.use(require('./routes/homeRoutes'));
app.use(require('./routes/signUpRoutes'));
app.use(require('./routes/loginRoutes'));
app.use(require('./routes/codigoComentadoRoutes'));
app.use(require('./routes/contatoRoutes'));
app.use(require('./routes/avisosRoutes'));

// ⚠️ Tratamento de erros
app.use(checkCsrfError);
app.use(notFound);

// 🚀 Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});