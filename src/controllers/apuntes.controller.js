const conexion = require('../db/database');

const obtenerApuntes = (req, res) => {
    const { page, limit } = req.query;

    let consulta = `SELECT * FROM apunte WHERE deleted = 0`;

    if (page && limit) {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        consulta += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    conexion.query(consulta, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al obtener los apuntes',
                error: error.message
            });
        }
        return res.status(200).json({
            message: 'Todos los apuntes:',
            result
        });
    });
}

const consultarApunte = (req, res) => {
    const id_apunte = req.params.id;
    conexion.query('SELECT * FROM apunte WHERE id_apunte = ? AND deleted = 0', [id_apunte], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar el apunte',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(200).json({
                message: 'Apunte encontrado',
                result
            });
        } else {
            return res.status(404).json({
                message: 'Apunte no encontrado'
            });
        }
    });
}

const agregarApunte = (req, res) => {
    const { id_apunte, contenido } = req.body;
    conexion.query('SELECT * FROM apunte WHERE id_apunte = ?', [id_apunte], (error, result) => {
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
            conexion.query(`INSERT INTO apunte (id_apunte, contenido, created_at, deleted) VALUES
            (${random},?,now(),0)`, [contenido], (error) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Error al agregar el apunte',
                        error: error.message
                    });
                }
                return res.status(200).json({
                    message: 'Apunte agregado exitosamente',
                });
            });
        }
    });
}

const eliminarApunteLogico = (req, res) => {
    const id_apunte = req.params.id;
    conexion.query('UPDATE apunte SET deleted_at = now(), deleted = 1 WHERE id_apunte = ?', [id_apunte], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el apunte',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Apunte no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Apunte eliminado'
            });
        }
    });
}

const eliminarApunteFisico = (req, res) => {
    const id_apunte = req.params.id;
    conexion.query('DELETE FROM apunte WHERE id_apunte = ?', [id_apunte], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el apunte',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Apunte no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Apunte eliminado'
            });
        }
    });
}

const editarApunteParcial = (req, res) => {
    const id_apunte = req.params.id;
    const { contenido } = req.body;
    conexion.query('UPDATE apunte SET contenido = IFNULL(?,contenido), updated_at = now() WHERE id_apunte = ?',
        [contenido, id_apunte], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el apunte',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Apunte no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Apunte editado exitosamente'
                });
            }
        });
}


const editarApunteTotal = (req, res) => {
    const id_apunte = req.params.id;
    const { contenido } = req.body;
    conexion.query('UPDATE apunte SET contenido = ?, updated_at = now() WHERE id_apunte = ?',
        [contenido, id_apunte], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el apunte',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Apunte no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Apunte editado exitosamente'
                });
            }
        });
}

module.exports = {
    obtenerApuntes,
    consultarApunte,
    agregarApunte,
    eliminarApunte: eliminarApunteFisico,
    editarApunteParcial,
    editarApunteTotal
}