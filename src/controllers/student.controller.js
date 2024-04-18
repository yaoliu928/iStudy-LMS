const getLogger = require('../common/logger');

const logger = getLogger(__filename);

const getAllStudents = (req, res) => {
  logger.info('find all students');
  res.formatResponse([], 400);
};
const getStudentById = (req, res) => {

};
const deleteStudentById = (req, res) => {

};
const updateStudentById = (req, res) => {

};
const addStudent = (req, res) => {

};

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById
};