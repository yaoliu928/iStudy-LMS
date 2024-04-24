const Course = require('../models/course.model');
const getLogger = require('../common/logger');
const NotFoundException = require('../common/exceptions/notFound.exception');
const addCourseSchema = require('../validations/addCourseSchema');
const updateCourseSchema = require('../validations/updateCourseSchema');

const logger = getLogger(__filename);

const getAllCourses = async (req, res, next) => {
  try {
    // TODO: add pagination
    const courses = await Course.find().exec();
    res.formatResponse(courses);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const validBody = await addCourseSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const course = await Course.create(validBody);
    res.formatResponse(course, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course not found: ${id}`);
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validBody = await updateCourseSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    const course = await Course.findByIdAndUpdate(
      id,
      validBody,
      { new: true, }).exec();
    if (!course) {
      throw new NotFoundException(`Course not found: ${id}`);
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id).exec();
    if (!course) {
      throw new NotFoundException(`Course not found: ${id}`);
    };
    res.formatResponse('', 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById
};