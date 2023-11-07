const conexion = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, email, password } = req.body;
    conexion.query('SELECT * FROM usuario WHERE username = ? AND email = ?', [username, email, password], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Error al iniciar de sesión',
                error: error.message
            });
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: 'Credenciales incorrectas'
            });
        }

        const encontrado = result[0];
        const correcto = bcrypt.compareSync(password, encontrado.password);

        if (!correcto) {
            return res.status(404).json({
                message: 'Password incorrecto'
            })
        } else {
            const payload = {
                user: {
                    id: encontrado.id_usuario
                }
            };

            const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });

            return res.status(200).json({
                message: 'Acceso exitoso',
                token
            })
        }
    });
}

module.exports = { login }