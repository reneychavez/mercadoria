const express = require('express')
const router = express.Router()

const MercadoController = require('./controllers/MercadoController');

router.get('/mercado', MercadoController.buscarTudo);
router.get('/mercado/:id', MercadoController.buscarUm);
router.post('/mercado', MercadoController.inserir);
router.put('/mercado/:id', MercadoController.alterar);
router.delete('/mercado/:id', MercadoController.excluir);

module.exports = router;