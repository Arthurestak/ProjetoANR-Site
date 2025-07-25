const express = require('express');
const path = require('path');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', dashboardRoutes);

app.listen(3001, () => console.log('Dashboard rodando em http://localhost:3001'));