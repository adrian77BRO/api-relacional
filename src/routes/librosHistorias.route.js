const express = require('express');
const router = express.Router();
const historiasController = require('../controllers/librosHistorias.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarToken, historiasController.obtenerCuentos);
router.get('/:id', authMiddleware.verificarToken, historiasController.consultarCuento);
router.post('/', authMiddleware.verificarToken, historiasController.agregarCuento);
router.delete('/:id', authMiddleware.verificarToken, historiasController.eliminarCuentoFisico);
router.patch('/:id', authMiddleware.verificarToken, historiasController.editarCuentoParcial);
router.put('/:id', authMiddleware.verificarToken, historiasController.editarCuentoTotal);
//Esta ruta permite el elimanado logico
router.put("/ocultar/:id",authMiddleware.verificarToken,historiasController.eliminarCuentoLogico);

module.exports = router;