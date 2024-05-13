const { Router } = require('express');
const {
  getAllCourses,
  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById } = require('../controllers/course.controller');

const courseRouter = Router();
courseRouter.get('/', getAllCourses);
courseRouter.post('/', addCourse);
courseRouter.get('/:id', getCourseById);
courseRouter.delete('/:id', deleteCourseById);
courseRouter.patch('/:id', updateCourseById);

module.exports = courseRouter;