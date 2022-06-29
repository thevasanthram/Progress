const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
  studentRollNo: {
    type: Number,
    required: true,
    unique: true,
  },
  quiz: {
    type: Array,
    required: true,
  },
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
