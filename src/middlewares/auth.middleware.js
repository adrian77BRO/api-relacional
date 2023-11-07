const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'Acceso denegado'
        });
    }

    try {
        const decoded = jwt.verify(token, 'secreto');
        req.user = {
            id: decoded.user.id,
            username: decoded.user.username
        }
        next();
      } catch (error) {
        return res.status(401).json({
            message: 'Token inválido'
        });
      }
}

module.exports = { verificarToken }