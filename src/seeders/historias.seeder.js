const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    cont_espanol: config.mysql.cont_espanol,
    database: config.mysql.database,
}

function ingresar() {
    try {
        const conexion = mysql.createConnection(dbconfig);
        const insertar = `INSERT INTO libro_historia (id_libro_his, titulo, descripcion, cont_espanol, cont_ingles,
        created_at, deleted) VALUES (?,?,?,?,?,now(),0)`;

        const librosHistorias = [
            { id_libro_his: 1, titulo: 'cuento1', descripcion: 'Descripcion del cuento 1', cont_espanol: 'Contenido 1', cont_ingles: 'Content 1' },
            { id_libro_his: 2, titulo: 'cuento2', descripcion: 'Descripcion del cuento 2', cont_espanol: 'Contenido 2', cont_ingles: 'Content 2' },
            { id_libro_his: 3, titulo: 'cuento3', descripcion: 'Descripcion del cuento 3', cont_espanol: 'Contenido 3', cont_ingles: 'Content 3' }
        ]

        librosHistorias.forEach(lh => {
            conexion.query(insertar, [lh.id_libro_his, lh.titulo, lh.descripcion, lh.cont_espanol, lh.cont_ingles], (error) => {
                if (error) {
                    console.error('Error al agregar los cuentos:', error);
                }
            });
        });
        conexion.end();

        console.log('Cuentos ingresados exitosamente');
    } catch (error) {
        console.error('Error al conectar la BD', error);
    }
}

ingresar();