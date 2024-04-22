const Course = require('../models/course.model');

const getAllCourses = async (req, res) => {
  // TODO: add pagination
  const courses = await Course.find().exec();
  res.formatResponse(courses);
};

const addCourse = async (req, res) => {
  const { name, code, description } = req.body;
  const course = await Course.create({ name, code, description });
  res.formatResponse(course, 201);
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id).exec();
  if (!course) {
    return res.formatResponse(`Course not found: ${id}`, 404);
  }
  res.formatResponse(course);
};

const updateCourseById = async (req, res) => {
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
};

const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.formatResponse(`Course not found: ${id}`, 404);
  };
  res.formatResponse('', 204);
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById
};