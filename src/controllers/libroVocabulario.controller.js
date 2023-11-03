const conexion = require('../db/database');

const obtenerLibros = (req, res) => {
    const { page, limit } = req.query;

    let consulta = `SELECT * FROM libro_vocabulario WHERE deleted = 0`;

    if (page && limit) {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        consulta += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    conexion.query(consulta, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al obtener los libros',
                error: error.message
            });
        }
        return res.status(200).json({
            message: 'Libros:',
            result
        });
    });
}

const consultarLibro = (req, res) => {
    const id_libro_voc = req.params.id;
    conexion.query('SELECT * FROM libro_vocabulario WHERE id_libro_voc = ? AND deleted = 0', [id_libro_voc], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar el libro',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(200).json({
                message: 'Libro encontrado',
                result
            });
        } else {
            return res.status(404).json({
                message: 'Libro no encontrado'
            });
        }
    });
}

const agregarLibro = (req, res) => {
    const { id_libro_voc, titulo, descripcion, contenido } = req.body;
    conexion.query('INSERT INTO libro_vocabulario (id_libro_voc, titulo, descripcion, contenido, created_at, deleted) VALUES (?, ?, ?, ?, now(), 0)',
        [id_libro_voc, titulo, descripcion, contenido], (error) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al agregar el libro',
                    error: error.message
                });
            }
            return res.status(200).json({
                message: 'Libro agregado exitosamente',
            });
        });
}

const eliminarLibroLogico = (req, res) => {
    const id_libro_voc = req.params.id;
    conexion.query('UPDATE libro_vocabulario SET deleted_at = now() WHERE id_libro_voc = ?', [id_libro_voc], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el libro',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Libro eliminado (lógicamente)'
            });
        }
    });
}

const eliminarLibroFisico = (req, res) => {
    const id_libro_voc = req.params.id;
    conexion.query('DELETE FROM libro_vocabulario WHERE id_libro_voc = ?', [id_libro_voc], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el libro',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Libro eliminado (físicamente)'
            });
        }
    });
}

const editarLibroParcial = (req, res) => {
    const id_libro_voc = req.params.id;
    const { titulo, descripcion, contenido } = req.body;
    conexion.query(`UPDATE libro_vocabulario SET titulo = IFNULL(?,titulo), descripcion = IFNULL(?,descripcion),
    contenido = IFNULL(?,contenido), updated_at = now() WHERE id_libro_voc = ?`,
        [titulo, descripcion, contenido, id_libro_voc], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el libro',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Libro no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Libro editado exitosamente'
                });
            }
        });
}

const editarLibroTotal = (req, res) => {
    const id_libro_voc = req.params.id;
    const { titulo, descripcion, contenido } = req.body;
    conexion.query(`UPDATE libro_vocabulario SET titulo = ?, descripcion = ?, contenido = ?, updated_at = now()
    WHERE id_libro_voc = ?`, [titulo, descripcion, contenido, id_libro_voc], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al editar el libro',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Libro editado exitosamente'
            });
        }
    });
}

module.exports = {
    obtenerLibros,
    consultarLibro,
    agregarLibro,
    eliminarLibro: eliminarLibroFisico,
    editarLibroParcial,
    editarLibroTotal
}
