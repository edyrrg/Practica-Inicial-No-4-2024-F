const express = require('express');
const router = express.Router();
const catedraticoController = require('../controllers/catedraticoController');

router.get('/catedraticos', catedraticoController.getAllCatedraticos);

module.exports = router;
