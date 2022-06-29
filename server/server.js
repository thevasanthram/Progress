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

app.get('/getquestions', (req, res) => {});

app.post('/setquestions', (req, res) => {});

app.post('/result', (req, res) => {});

app.get('/history', (req, res) => {});

app.get('/logout', (req, res) => {});
