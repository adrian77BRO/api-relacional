const express = require('express')
const router = express.Router()
const vocabularioController = require('../controllers/libroVocabulario.controller')

router.get('/', vocabularioController.obtenerLibros);
router.get('/:id', vocabularioController.consultarLibro);
router.post('/', vocabularioController.agregarLibro);
router.delete('/:id', vocabularioController.eliminarLibro);
router.patch('/:id', vocabularioController.editarLibroParcial);
router.put('/:id', vocabularioController.editarLibroTotal);

module.exports = router;