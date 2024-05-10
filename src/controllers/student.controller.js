const Student = require('../models/student.model');
const getLogger = require('../common/logger');
const addStudentSchema = require('../validations/addStudentSchema');
const updateStudentSchema = require('../validations/updateStudentSchema');
const Course = require('../models/course.model');
const NotFoundException = require('../common/exceptions/notFound.exception');

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
    const validBody = await addStudentSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const student = await Student.create(validBody);
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
      throw new NotFoundException(`Student not found: ${id}`);
    };
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validBody = await updateStudentSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const student = await Student.findByIdAndUpdate(
      id,
      validBody,
      { new: true, }).exec();
    if (!student) {
      throw new NotFoundException(`Student not found: ${id}`);
    };
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
      throw new NotFoundException(`Student not found: ${id}`);
    };
    res.formatResponse('', 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudentToCourse = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.params;
    const student = await Student.findById(studentId).exec();
    const course = await Course.findById(courseId).exec();
    if (!student) {
      throw new NotFoundException(`Student not found: ${studentId}`);
    };
    if (!course) {
      throw new NotFoundException(`Course not found: ${courseId}`);
    };
    student.courses.addToSet(courseId);
    course.students.addToSet(studentId);
    await student.save();
    await course.save();
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
}

module.exports = {
  getAllStudents,
  addStudent,
  getStudentById,
  deleteStudentById,
  updateStudentById,
  addStudentToCourse
};