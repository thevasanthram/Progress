const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correctanswer: {
    type: Number,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
