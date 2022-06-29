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

// API to collect admin questions from database
app.get('/getquestions', async (req, res) => {
  try {
    const documents = await Question.find();
    return res.json({
      status: 'success',
      Question: documents,
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// API to save admin questions to Database
app.post('/setquestions', async (req, res) => {
  try {
    const questions = req.body.questions;
    const documents = [];

    // console.log('');

    for (i = 0; i < questions.length; i++) {
      // console.log('Question: ', questions[i].question);
      // console.log('CorrectAnswer: ', questions[i].correctanswer);
      // console.log('Options: ', questions[i].options);
      // console.log('');

      let document = await Question.create({
        question: questions[i].question,
        correctanswer: questions[i].correctanswer,
        options: questions[i].options,
      });

      documents.push(document);
    }

    return res.json({
      status: 'success',
      Question: documents,
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
