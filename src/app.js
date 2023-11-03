const express = require('express');
const app = express();
const config = require('./config');
const usuariosRouter = require('./routes/usuarios.route');
const historiasRouter = require('./routes/librosHistorias.route');
const authRouter = require('./routes/auth.route');
require('./db/database');

app.set('port', config.app.port);
app.use(express.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/historias', historiasRouter);
app.use('/auth', authRouter);

module.exports = app;