const mongoose = require('mongoose');

// Data Schema for Student Model
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
