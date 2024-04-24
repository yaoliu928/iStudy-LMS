const { Schema, model } = require('mongoose');
const Joi = require('joi');

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [{
      validator: (email) => {
        return Joi.string().email().validate(email).error === undefined;
      },
      msg: 'Invalid email format'
    }]
  },
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  }
);

const Student = model('Student', studentSchema);

module.exports = Student;