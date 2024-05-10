const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'default description',
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }
  ]
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  }
);

const Course = model('Course', courseSchema);

module.exports = Course;