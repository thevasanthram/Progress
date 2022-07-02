import './PrepareQuiz.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PrepareQuiz() {
  const [singleQuestion, setSingleQuestion] = useState('');
  const [singleQuestionOptions, setSingleQuestionOptions] = useState([]);
  const [correctoption, setCorrectOption] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'question':
        setSingleQuestion(value);
        break;

      case 'option':
        let options = singleQuestionOptions;
        options.push(value);
        setSingleQuestionOptions(options);
        break;

      case 'correctoption':
        value == 'A' ||
        value == 'B' ||
        value == 'C' ||
        value == 'D' ||
        value == 'a' ||
        value == 'b' ||
        value == 'c' ||
        value == 'd'
          ? setError('')
          : setError('Option must be among [A,B,C,D]');
        setCorrectOption(value);

      default:
        break;
    }
  };

  return (
    <div class='preparequiz'>
      {singleQuestionOptions}
      <h1>Prepare Quiz</h1>
      <hr />
      <div class='quizcontent'>
        <form name='form'>
          <div class='question'>
            <div class='form-group'>
              <div class='question'>
                <textarea
                  class='form-control'
                  id='exampleFormControlTextarea1'
                  rows='2'
                  name='question'
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
                  onChange={handleChange}
                  name='option'
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
                  onChange={handleChange}
                  name='option'
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
                  onChange={handleChange}
                  name='option'
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
                  name='option'
                  placeholder='Option D'
                  aria-label='Username'
                  aria-describedby='basic-addon1'
                  onChange={handleChange}
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
                  name='correctoption'
                  id='exampleInputPassword1'
                  placeholder='Correct Option'
                  onClick={handleChange}
                  maxLength={1}
                />
                {error && (
                  <div>
                    <span class='error'>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class='navigation'>
            <button type='submit' class='btn btn-primary'>
              Upload
            </button>
          </div>
          <div class='anotherquestion'>
            <button
              onClick={() => navigate('/preparequiz')}
              class='btn btn-primary'
            >
              Add another question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrepareQuiz;
