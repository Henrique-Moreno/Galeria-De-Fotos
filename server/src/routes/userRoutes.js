const express = require('express');
const UserController = require('../controllers/UserController');
const { validateCreateUser, validateLogin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar usuário
router.post('/register', validateCreateUser, UserController.createUser);

// Rota para login de usuário
router.post('/login', validateLogin, UserController.login);

module.exports = router;