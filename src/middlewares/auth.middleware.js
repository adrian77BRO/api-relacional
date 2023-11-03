const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado'
        });
    }

    jwt.verify(token, 'secreto', (error, decode) => {
        if (error) {
            return res.status(401).send({
                message: 'Error al validar token',
                error: error.message
            });
        }

        req.user = decode.user;
        next();
    })
}

module.exports = { verificarToken }