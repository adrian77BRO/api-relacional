const express = require('express');
const router = express.Router();
const apuntesController = require('../controllers/apuntes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarToken, apuntesController.obtenerApuntes);
router.get('/:id', authMiddleware.verificarToken, apuntesController.consultarApunte);
router.post('/', authMiddleware.verificarToken, apuntesController.agregarApunte);
router.delete('/:id', authMiddleware.verificarToken, apuntesController.eliminarApunte);
router.patch('/:id', authMiddleware.verificarToken, apuntesController.editarApunteParcial);
router.put('/:id', authMiddleware.verificarToken, apuntesController.editarApunteTotal);

module.exports = router;