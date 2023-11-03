const conexion = require('../db/database');

const obtenerCuentos = (req, res) => {
    const { page, limit } = req.query;

    let consulta = `SELECT * FROM libro_historia WHERE deleted = 0`;

    if (page && limit) {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        consulta += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    conexion.query(consulta, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al obtener los cuentos',
                error: error.message
            });
        }
        return res.status(200).json({
            message: 'Cuentos:',
            result
        });
    });
}

const consultarCuento = (req, res) => {
    const id_libro_his = req.params.id;
    conexion.query('SELECT * FROM libro_historia WHERE id_libro_his = ? AND deleted = 0', [id_libro_his], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar el cuento',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(200).json({
                message: 'Cuento encontrado',
                result
            });
        } else {
            return res.status(404).json({
                message: 'Cuento no encontrado'
            });
        }
    });
}

const agregarCuento = (req, res) => {
    const { id_libro_his, titulo, descripcion, cont_espanol, cont_ingles } = req.body;
    conexion.query('SELECT * FROM libro_historia WHERE id_libro_his = ?', [id_libro_his], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(404).json({
                message: 'ID repetido'
            });
        } else {
            const random = Math.floor(Math.random() * (1000 + 1) + 1);
            conexion.query(`INSERT INTO libro_historia (id_libro_his, titulo, descripcion, cont_espanol, cont_ingles, created_at,
            deleted) VALUES (${random},?,?,?,?,now(),0)`, [titulo, descripcion, cont_espanol, cont_ingles], (error) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Error al agregar el cuento',
                        error: error.message
                    });
                }
                return res.status(200).json({
                    message: 'Cuento agregado exitosamente',
                });
            });
        }
    });
}

const eliminarCuentoLogico = (req, res) => {
    const id_libro_his = req.params.id;
    conexion.query('UPDATE libro_historia SET deleted_at = now(), deleted = 1 WHERE id_libro_his = ?', [id_libro_his], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el cuento',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Cuento no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Cuento eliminado'
            });
        }
    });
}

const eliminarCuentoFisico = (req, res) => {
    const id_libro_his = req.params.id;
    conexion.query('DELETE FROM libro_historia WHERE id_libro_his = ?', [id_libro_his], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el cuento',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Cuento no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Cuento eliminado'
            });
        }
    });
}

const editarCuentoParcial = (req, res) => {
    const id_libro_his = req.params.id;
    const { titulo, descripcion, cont_espanol, cont_ingles } = req.body;
    conexion.query(`UPDATE libro_historia SET titulo = IFNULL(?,titulo), descripcion = IFNULL(?,descripcion),
    cont_espanol = IFNULL(?,cont_espanol), cont_ingles = IFNULL(?,cont_ingles), updated_at = now() WHERE id_libro_his = ?`,
        [titulo, descripcion, cont_espanol, cont_ingles, id_libro_his], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el cuento',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Cuento no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Cuento editado exitosamente'
                });
            }
        });
}


const editarCuentoTotal = (req, res) => {
    const id_libro_his = req.params.id;
    const { titulo, descripcion, cont_espanol, cont_ingles } = req.body;
    conexion.query(`UPDATE libro_historia SET titulo = ?, descripcion = ?, cont_espanol = ?, cont_ingles = ?, updated_at = now()
    WHERE id_libro_his = ?`, [titulo, descripcion, cont_espanol, cont_ingles, id_libro_his], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al editar el cuento',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Cuento no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Cuento editado exitosamente'
            });
        }
    });
}

module.exports = {
    obtenerCuentos,
    consultarCuento,
    agregarCuento,
    eliminarCuentoFisico,
    editarCuentoParcial,
    editarCuentoTotal,
    eliminarCuentoLogico
}