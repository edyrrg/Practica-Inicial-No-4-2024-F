const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');

router.get('/publicaciones', publicationController.getAllPublications);
router.post('/publicaciones/catedraticos', publicationController.createPublicationCatedratico);
router.post('/publicaciones/cursos', publicationController.createPublicationCurso);
router.get('/publicaciones/cursos', publicationController.getAllPublicationCursos);
router.get('/publicaciones/catedraticos', publicationController.getAllPublicationCatedraticos);
router.get('/publicaciones/curso', publicationController.getPublicationByCursoName);
router.get('/publicaciones/catedratico', publicationController.getPublicationByCatedraticoName);

module.exports = router;