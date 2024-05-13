const { Router } = require('express');
const {
  getAllCourses,
  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById } = require('../controllers/course.controller');
const adminGuardMiddleware = require('../middleware/adminGuard.middleware');

const courseRouter = Router();
courseRouter.get('/', getAllCourses);
courseRouter.post('/', addCourse);
courseRouter.get('/:id', getCourseById);
// Only admin role can delete
courseRouter.delete('/:id', adminGuardMiddleware, deleteCourseById);
courseRouter.patch('/:id', updateCourseById);

module.exports = courseRouter;