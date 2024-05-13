const { Router } = require('express');
const studentRouter = require('./student.router');
<<<<<<< HEAD
const courseRouter = require('./course.router');
const authRouter = require('./auth.router');
const authGuardMiddleware = require('../middleware/authGuard.middleware');

const v1Router = Router();

v1Router.use('/students', authGuardMiddleware, studentRouter);
v1Router.use('/courses', authGuardMiddleware, courseRouter);
v1Router.use('/auth', authRouter);
=======

const v1Router = Router();

v1Router.use('/students', studentRouter);
>>>>>>> master

module.exports = v1Router;