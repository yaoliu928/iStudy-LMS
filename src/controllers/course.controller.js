const Course = require('../models/course.model');
const getLogger = require('../common/logger');

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
    const { name, code, description } = req.body;
    const course = await Course.create({ name, code, description });
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
      return res.formatResponse(`Course not found: ${id}`, 404);
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
    const { name, code, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      { name, code, description },
      { new: true, }).exec();
    if (!course) {
      return res.formatResponse(`Course not found: ${id}`, 404);
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
      return res.formatResponse(`Course not found: ${id}`, 404);
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