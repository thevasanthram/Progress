const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// API to register by a student
app.post('/register', async (req, res) => {
  try {
    const rollno = req.body.rollno;
    const name = req.body.name;
    const password = req.body.password;

    // console.log('Roll no: ', rollno);
    // console.log('Name: ', name);
    // console.log('Password: ', password);

    const saltRounds = Number(1);

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return res.json({
          status: 'error',
          error: 'Error While Saving',
        });
      } else {
        const student = await Student.findOne({ rollno: rollno });
        if (student) {
          //student already found

          return res.json({
            status: 'error',
            error: 'Duplicate Roll number',
          });
        } else {
          //new student

          const document = await Student.create({
            rollno: rollno,
            name: name,
            password: hash,
          });

          return res.json({
            status: 'success',
            Student: document,
          });
        }
      }
    });
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

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

// API to store result after evaluating quiz
app.post('/result', async (req, res) => {
  try {
    const studentRollNo = req.body.studentRollNo; // 01
    const score = req.body.score; // "8/10"
    const time = req.body.time; //"29-06-2022 09:01 PM" (string)

    // console.log('Student Roll No: ', studentRollNo);
    // console.log('Score: ', score);
    // console.log('Quiz time: ', time);

    const student = await History.findOne({ studentRollNo: studentRollNo });
    // console.log(student);

    if (student) {
      //student found

      const quizArray = student.quiz;
      quizArray.push({
        score: score,
        time: time,
      });

      const document = await History.updateOne(
        {
          studentRollNo: studentRollNo,
        },
        {
          $set: {
            quiz: quizArray,
          },
        }
      );

      return res.json({
        status: 'success',
        Result: document,
      });
    } else {
      //no student found
      const quizArray = [{ score: score, time: time }];
      const document = await History.create({
        studentRollNo: studentRollNo,
        quiz: quizArray,
      });

      return res.json({
        status: 'success',
        Result: document,
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// API to get quiz history of a student
app.post('/history', async (req, res) => {
  try {
    const studentRollNo = req.body.studentRollNo;

    const student = await History.findOne({ studentRollNo: studentRollNo });
    // console.log('Student: ', student);
    if (student) {
      //student found

      return res.json({
        status: 'success',
        History: student,
      });
    } else {
      //student not found

      return res.json({
        status: 'fail',
        History: 'Seems you have not taken any quiz before.',
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

app.get('/logout', (req, res) => {});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
