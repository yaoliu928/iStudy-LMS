const { Router } = require('express');
const {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  addStudentToCourse,
  deleteStudentFromCourse } = require('../controllers/student.controller');
const adminGuardMiddleware = require('../middleware/adminGuard.middleware');

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.post('/', addStudent);
studentRouter.get('/:id', getStudentById);
// Only admin role can delete
studentRouter.delete('/:id', adminGuardMiddleware, deleteStudentById);
studentRouter.patch('/:id', updateStudentById);
studentRouter.post('/:studentId/courses/:courseId', addStudentToCourse);
studentRouter.delete('/:studentId/courses/:courseId', deleteStudentFromCourse);

module.exports = studentRouter;