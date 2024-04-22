const { Schema, model } = require('mongoose');
const Joi = require('joi');

const studentSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
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