const conexion = require('../db/database');
const bcrypt = require('bcrypt');

const obtenerUsuarios = (req, res) => {
    const { page, limit } = req.query;

    let consulta = `SELECT id_usuario, username, email, password, created_at, created_by,
    updated_at, deleted_at, deleted FROM usuario WHERE deleted = 0`;

    if (page && limit) {
        const offset = (parseInt(page) - 1) * parseInt(limit);
        consulta += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    conexion.query(consulta, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al obtener los usuarios',
                error: error.message
            });
        }
        return res.status(200).json({
            message: 'Todos los usuarios',
            result
        });
    });
}

const consultarUsuario = (req, res) => {
    const id_usuario = req.params.id;
    conexion.query(`SELECT username, email, password, created_at, updated_at, deleted_at,
    deleted FROM usuario WHERE id_usuario = ? AND deleted = 0`, [id_usuario], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar el usuario',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(200).json({
                message: 'Usuario encontrado',
                result
            });
        } else {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
    });
}

const agregarUsuario = (req, res) => {
    const { id_usuario, username, email, password } = req.body;
    const auth = req.user.id;

    conexion.query('SELECT * FROM usuario WHERE id_usuario = ? OR email = ?', [id_usuario, email], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al consultar',
                error: error.message
            });
        }
        if (result.length > 0) {
            return res.status(404).json({
                message: 'El correo electrónico ya existe'
            });
        } else {
            const encriptado = bcrypt.hashSync(password, 10)
            conexion.query(`INSERT INTO usuario (id_usuario, username, email, password, etapas, nivel, puntaje,
                cant_estrellas, lecc_comp, cuest_comp, created_at, created_by, deleted) VALUES (?,?,?,'${encriptado}',
                'abc',1,0,0,0,0,now(),${auth},0)`, [id_usuario, username, email, password], (error) => {
                if (error) {
                    return res.status(500).json({
                        message: 'Error al agregar el usuario',
                        error: error.message
                    });
                }
                return res.status(200).json({
                    message: 'Usuario agregado exitosamente',
                });
            });
        }
    });
}

const eliminarUsuarioLogico = (req, res) => {
    const id_usuario = req.params.id;
    conexion.query('UPDATE usuario SET deleted_at = now(), deleted = 1 WHERE id_usuario = ?', [id_usuario], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el usuario',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Usuario eliminado'
            });
        }
    });
}

const eliminarUsuarioFisico = (req, res) => {
    const id_usuario = req.params.id;
    conexion.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al eliminar el usuario',
                error: error.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        } else {
            return res.status(200).json({
                message: 'Usuario eliminado'
            });
        }
    });
}

const editarUsuarioParcial = (req, res) => {
    const id_usuario = req.params.id;
    const { username, email, password } = req.body;
    //const encriptado = bcrypt.hash(password, 10);
    conexion.query(`UPDATE usuario SET username = IFNULL(?,username), email = IFNULL(?,email),
    password = IFNULL(?,password), updated_at = now() WHERE id_usuario = ?`,
        [username, email, password, id_usuario], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el usuario',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Usuario editado exitosamente'
                });
            }
        });
}


const editarUsuarioTotal = (req, res) => {
    const id_usuario = req.params.id;
    const { username, email, password } = req.body;
    conexion.query(`UPDATE usuario SET username = ?, email = ?, password = ?, updated_at = now() WHERE id_usuario = ?`,
        [username, email, password, id_usuario], (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: 'Error al editar el usuario',
                    error: error.message
                });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            } else {
                return res.status(200).json({
                    message: 'Usuario editado exitosamente'
                });
            }
        });
}

module.exports = {
    obtenerUsuarios,
    consultarUsuario,
    agregarUsuario,
    eliminarUsuarioLogico,
    eliminarUsuarioFisico,
    editarUsuarioParcial,
    editarUsuarioTotal
}