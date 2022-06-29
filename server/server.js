const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const Question = require('./models/question');
const History = require('./models/history');

const db = mongoose
  .connect(
    'mongodb+srv://admin:admin@progress.ndhto.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(console.log('Database connection established'))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {});

app.post('/login', (req, res) => {});

app.get('/getallquestions', (req, res) => {});

app.post('/setquestions', async (req, res) => {
  try {
    const question = req.body.question;
    const correctAnswer = req.body.correctanswer;
    const options = req.body.options;

    // console.log('');
    // console.log('Question: ', question);
    // console.log('CorrectAnswer: ', correctAnswer);
    // console.log('Options: ', options);
    // console.log('');

    const document = await Question.create({
      question: question,
      correctanswer: correctAnswer,
      options: options,
    });

    return res.json({
      status: 'success',
      Question: document,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

app.post('/result', (req, res) => {});

app.get('/history', (req, res) => {});

app.get('/logout', (req, res) => {});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
