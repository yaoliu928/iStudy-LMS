const { Schema, model } = require('mongoose');
<<<<<<< HEAD
const Joi = require('joi');
=======
>>>>>>> master

const studentSchema = new Schema({
  firstName: {
    type: String,
<<<<<<< HEAD
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
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
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
=======
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
});
>>>>>>> master

const Student = model('Student', studentSchema);

module.exports = Student;