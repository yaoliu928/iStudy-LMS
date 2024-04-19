const getLogger = require('../common/logger');
const Student = require('../models/student.model');

const getAllStudents = async (req, res) => {
  // TODO: add pagination
  const students = await Student.find().exec();
  res.formatResponse(students);
};

const addStudent = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const student = await Student.create({ firstName, lastName, email });
  res.formatResponse(student, 201);
};

const getStudentById = (req, res) => { };
const updateStudentById = (req, res) => { };
const deleteStudentById = (req, res) => { };

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById
};