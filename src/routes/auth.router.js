const { Router } = require('express');
const { login, register } = require('../controllers/auth.controller.js');

const authRouter = Router();

// POST /auth/login
authRouter.post('/login', login);
authRouter.post('/register', register);

module.exports = authRouter;