const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarToken, usuariosController.obtenerUsuarios);
router.get('/:id', authMiddleware.verificarToken, usuariosController.consultarUsuario);
router.post('/', authMiddleware.verificarToken, usuariosController.agregarUsuario);
router.put('/eliminar/:id', authMiddleware.verificarToken, usuariosController.eliminarUsuarioLogico);
router.delete('/eliminar/:id', authMiddleware.verificarToken, usuariosController.eliminarUsuarioFisico);
router.patch('/:id', authMiddleware.verificarToken, usuariosController.editarUsuarioParcial);
router.put('/:id', authMiddleware.verificarToken, usuariosController.editarUsuarioTotal);

module.exports = router;