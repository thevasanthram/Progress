import './PrepareQuiz.css';
import React from 'react';
import { useState } from 'react';

function PrepareQuiz() {
  const [questions, setQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState('');
  const [singleQuestionOptions, setSingleQuestionOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  const IncreamentQuestionNumber = () => {
    setQuestionNumber(questionNumber + 1);
  };

  const DecreamentQuestionNumber = () => {
    setQuestionNumber(questionNumber - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'question':
        break;

      case 'option':
        break;

      default:
        break;
    }
    setSingleQuestion(e.target.value);
  };

  return (
    <div class='preparequiz'>
      <h1>Prepare Quiz</h1>
      <hr />
      <div class='quizcontent'>
        <form name='form'>
          <div class='question'>
            <h4 class='title'>Question No: {questionNumber + 1}</h4>
            <div class='form-group'>
              <div class='question'>
                <textarea
                  class='form-control'
                  id='exampleFormControlTextarea1'
                  rows='2'
                  onChange={handleChange}
                  placeholder='Start typing question'
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class='options'>
            <h4 class='title'>Options:</h4>
            <div class='option'>
              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='basic-addon1'>
                    A
                  </span>
                </div>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Option A'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  required
                />
              </div>

              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='basic-addon1'>
                    B
                  </span>
                </div>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Option B'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  required
                />
              </div>

              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='basic-addon1'>
                    C
                  </span>
                </div>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Option C'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  required
                />
              </div>

              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='basic-addon1'>
                    D
                  </span>
                </div>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Option D'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  required
                />
              </div>
            </div>
          </div>
          <div class='answer'>
            <h4 class='title'>Answer:</h4>
            <div class='correctoption'>
              <div class='form-group'>
                <input
                  type='text'
                  class='form-control'
                  id='exampleInputPassword1'
                  placeholder='Correct Option'
                  maxLength={1}
                />
              </div>
            </div>
          </div>
          <div class='navigation'>
            <button type='submit' class='btn btn-primary'>
              Upload
            </button>
            {questionNumber > 0 && (
              <div class='navigation'>
                <button
                  onClick={DecreamentQuestionNumber}
                  class='btn btn-primary'
                >
                  Prev
                </button>
              </div>
            )}
            <div class='navigationbutton'>
              <button
                onClick={IncreamentQuestionNumber}
                class='btn btn-primary'
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrepareQuiz;
