const conexion = require('../db/database');

// Seed data
const librosSeedData = [
    {
        titulo: 'Libro 1',
        descripcion: 'Descripción del Libro 1',
        contenido: 'Contenido del Libro 1'
    },
    {
        titulo: 'Libro 2',
        descripcion: 'Descripción del Libro 2',
        contenido: 'Contenido del Libro 2'
    },
    {
        titulo: 'Libro 3',
        descripcion: 'Descripción del Libro 3',
        contenido: 'Contenido del Libro 3'
    }
];

// Seeder function
const seedLibros = () => {
    librosSeedData.forEach(libro => {
        conexion.query('INSERT INTO libro_vocabulario (id_libro_voc, titulo, descripcion, contenido, created_at, deleted) VALUES (?, ?, ?, ?, now(), 0)',
            [libro.id_libro_voc, libro.titulo, libro.descripcion, libro.contenido], (error) => {
                if (error) {
                    console.error('Error al insertar datos de libro:', error.message);
                } else {
                    console.log('Libro insertado exitosamente');
                }
            });
    });
}

// Ejecutar el seeder
seedLibros();
