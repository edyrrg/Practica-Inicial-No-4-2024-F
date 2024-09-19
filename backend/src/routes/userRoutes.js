// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/usuarios', userController.getAllUsers);
router.get('/usuarios/search/', userController.findUserByCarnet);
router.get('/usuarios/:id', userController.getUserById);
router.post('/usuarios', userController.createUser);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.post('/login', userController.login)
router.patch('/reset_password', userController.resetPassword)

module.exports = router;