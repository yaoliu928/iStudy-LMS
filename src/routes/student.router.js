const { Router } = require('express');
const {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  addStudentToCourse,
  deleteStudentFromCourse } = require('../controllers/student.controller');

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', addStudent);
studentRouter.get('/:id', getStudentById);
studentRouter.delete('/:id', deleteStudentById);
studentRouter.patch('/:id', updateStudentById);
studentRouter.post('/:studentId/courses/:courseId', addStudentToCourse);
studentRouter.delete('/:studentId/courses/:courseId', deleteStudentFromCourse);

module.exports = studentRouter;