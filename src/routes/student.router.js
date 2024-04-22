const { Router } = require('express');
const {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById } = require('../controllers/student.controller');

const studentRouter = Router();
studentRouter.get('/', getAllStudents);
studentRouter.post('/', addStudent);
studentRouter.get('/:id', getStudentById);
studentRouter.delete('/:id', deleteStudentById);
studentRouter.patch('/:id', updateStudentById);

module.exports = studentRouter;