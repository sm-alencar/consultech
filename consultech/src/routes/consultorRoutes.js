const { Router } = require('express');
const consultorController = require('../controllers/consultorController');

const router = Router();

router.get('/', consultorController.listar);
router.post('/', consultorController.cadastrar);

module.exports = router;