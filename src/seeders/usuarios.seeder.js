const mysql = require('mysql');
const config = require('../config');
const bcrypt = require('bcrypt');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

function seedDatabase() {
    try {
        const conexion = mysql.createConnection(dbconfig);
        const insertar = `INSERT INTO usuario (id_usuario, username, email, password, etapas,
            nivel, puntaje, cant_estrellas, lecc_comp, cuest_comp, created_at, deleted) VALUES (?,?,?,?,'abc',1,0,0,0,0,now(),0)`;

        const usuarios = [
            { username: 'usuario1', email: 'email1@gmail.com', password: bcrypt.hashSync('1234', 10) },
            { username: 'usuario2', email: 'email2@gmail.com', password: bcrypt.hashSync('1234', 10) },
            { username: 'usuario3', email: 'email3@gmail.com', password: bcrypt.hashSync('1234', 10) },
            { username: 'usuario4', email: 'email4@gmail.com', password: bcrypt.hashSync('1234', 10) },
            { username: 'usuario5', email: 'email5@gmail.com', password: bcrypt.hashSync('1234', 10) },
            { username: 'usuario6', email: 'email6@gmail.com', password: bcrypt.hashSync('1234', 10) },
        ];

        for (const usuario of usuarios) {
            conexion.query(insertar, [usuario.id_usuario, usuario.username, usuario.email, usuario.password], (error) => {
                if (error) {
                    console.error('Error al agregar usuario:', error);
                }
            });
        }
        conexion.end();

        console.log('Usuarios ingresados exitosamente');
    } catch (error) {
        console.error('Error al conectar la BD', error);
    }
}

seedDatabase();