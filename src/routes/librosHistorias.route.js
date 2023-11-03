const express = require('express');
const router = express.Router();
const historiasController = require('../controllers/librosHistorias.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarToken, historiasController.obtenerCuentos);
router.get('/:id', authMiddleware.verificarToken, historiasController.consultarCuento);
router.post('/', authMiddleware.verificarToken, historiasController.agregarCuento);
router.delete('/:id', authMiddleware.verificarToken, historiasController.eliminarCuento);
router.patch('/:id', authMiddleware.verificarToken, historiasController.editarCuentoParcial);
router.put('/:id', authMiddleware.verificarToken, historiasController.editarCuentoTotal);

module.exports = router;