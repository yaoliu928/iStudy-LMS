const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
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