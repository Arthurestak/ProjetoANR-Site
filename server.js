require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

// ROTAS
const questionRoutes = require('./routes/questionRoutes');
const ebookRoutes = require('./routes/ebookRoutes');
const mentoriaRoutes = require('./routes/mentoriaRoutes');
const enacRoutes = require('./routes/enacRoutes');
const homeRoutes = require('./routes/homeRoutes');
const singUpRoutes = require('./routes/singUpRoutes');
const loginRoutes = require('./routes/loginRoutes');
const codigoComentadoRoutes = require('./routes/codigoComentadoRoutes');
const contatoRoutes = require('./routes/contatoRoutes');
const avisosRoutes = require('./routes/avisosRoutes');

const app = express();

// //configurando o cors
const whiteList = [ 'http://localhost:3002', 'http://localhost:3000' ];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
};

// SESSÃO E FLASH
app.use(session({
  secret: process.env.SECRET_SESSIONS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true
  }
}));
app.use(flash());

// EJS CONFIGURAÇÃO
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
const { checkCsrfError, middlewareGlobal, notFound} = require('./middlewares/middleware');
app.use(middlewareGlobal);

// ROTAS EXTERNAS
app.use(questionRoutes);
app.use(ebookRoutes);
app.use(mentoriaRoutes);
app.use(enacRoutes);
app.use(homeRoutes);
app.use(singUpRoutes);
app.use(loginRoutes);
app.use(codigoComentadoRoutes);
app.use(contatoRoutes);
app.use(avisosRoutes);

app.use(checkCsrfError);
app.use(notFound);

// SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
