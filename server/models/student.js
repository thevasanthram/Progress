const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  rollno: {
    type: Number,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
