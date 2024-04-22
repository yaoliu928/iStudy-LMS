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

const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    return res.formatResponse(`Student not found: ${id}`, 404);
  }
  res.formatResponse(student);
};

const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true, }).exec();
  if (!student) {
    return res.formatResponse(`Student not found: ${id}`, 404);
  }
  res.formatResponse(student);
};

const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.formatResponse(`Student not found: ${id}`, 404);
  };
  res.formatResponse('', 204);
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById
};