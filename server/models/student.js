const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  rollno: {
    type: Number,
    unique: true,
    required: true,
  },
  password1: {
<<<<<<< HEAD
=======
    type: String,
    required: true,
  },
  password2: {
>>>>>>> fae19d6629f05533b8e4fb58c4d21339e4c5e818
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
