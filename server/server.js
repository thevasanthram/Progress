const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const Student = require('./models/student');
const Question = require('./models/question');
const History = require('./models/history');

//MongoDB Connection
const db = mongoose
  .connect(
    'mongodb+srv://admin:admin@progress.ndhto.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(console.log('Database connection established'))
  .catch((err) => {
    console.log(err);
  });

// creating an express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API to register by a student
app.post('/register', async (req, res) => {
  try {
    // const rollno = req.body.rollno;
    // const name = req.body.name;
    // const password = req.body.password;

    console.log('Roll no: ', rollno);
    console.log('Name: ', name);
    console.log('Password: ', password);

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
            data: document,
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

//API to login
app.post('/login', async (req, res) => {
  try {
    const rollno = req.body.rollno;
    const password = req.body.password;

    // console.log('Roll no: ', rollno);
    // console.log('Password: ', password);

    const student = await Student.findOne({ rollno: rollno });
    if (student) {
      bcrypt.compare(password, student.password, function (err, result) {
        if (result) {
          return res.json({
            status: 'success',
            data: student,
          });
        } else {
          return res.json({
            status: 'error',
            error: 'Invalid Password',
          });
        }
      });
    } else {
      return res.json({
        status: 'error',
        error: 'Roll number not Registered',
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

// API to collect admin questions from database
app.get('/getquestions', async (req, res) => {
  try {
    const documents = await Question.find();
    return res.json({
      status: 'success',
      data: documents,
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
    const questionSet = req.body.questionSet;
    const documents = [];

    // console.log('');

    let document = await Question.create({
      question: questionSet.question,
      correctanswer: questionSet.correctoption,
      options: questionSet.options,
    });

    documents.push(document);

    return res.json({
      status: 'success',
      data: documents,
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
        data: document,
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
        data: document,
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

app.get('/scorecard', async (req, res) => {
  try {
    const document = await History.find();
    // console.log(document);
    if (document) {
      return res.json({
        status: 'success',
        data: document,
      });
    } else {
      return res.json({
        status: 'error',
        error: 'No one attended quiz',
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
        data: student,
      });
    } else {
      //student not found

      return res.json({
        status: 'error',
        error: 'Seems you have not taken any quiz before.',
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: err,
    });
  }
});

//Application port configuration
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
