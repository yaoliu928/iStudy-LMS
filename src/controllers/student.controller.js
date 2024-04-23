const Student = require('../models/student.model');
const getLogger = require('../common/logger');

const logger = getLogger(__filename);

const getAllStudents = async (req, res, next) => {
  try {
    // TODO: add pagination
    const students = await Student.find().exec();
    res.formatResponse(students);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = await Student.create({ firstName, lastName, email });
    res.formatResponse(student, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.formatResponse(`Student not found: ${id}`, 404);
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateStudentById = async (req, res, next) => {
  try {
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
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
      return res.formatResponse(`Student not found: ${id}`, 404);
    }
    res.formatResponse('', 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById
};