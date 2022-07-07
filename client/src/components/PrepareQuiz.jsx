import './PrepareQuiz.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function PrepareQuiz() {
  const [questionSet, setQuestionSet] = useState({
    question: '',
    options: {
      0: '',
      1: '',
      2: '',
      3: '',
    },
    correctoption: '',
  });
  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [ErrorResponse, setErrorResponse] = useState('');
  const [ErrorResponseState, setErrorResponseState] = useState('');
  const [SuccessResponse, setSuccessResponse] = useState('');
  const [SuccessResponseState, setSuccessResponseState] = useState('');

  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error.length > 0) {
      setErrorMsg(true);
    } else {
      const response = await fetch('http://localhost:5000/setquestions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          questionSet: questionSet,
        }),
      });

      const data = await response.json();

      if (data.status == 'error') {
        setErrorResponse(data.error);
        setErrorResponseState(true);

        setTimeout(() => {
          setErrorResponseState(false);
        }, 5000);
      } else {
        setSuccessResponse(
          'Upload done! For adding more questions, clear filled values & try new'
        );
        setSuccessResponseState(true);

        setTimeout(() => {
          setSuccessResponseState(false);
        }, 10000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'question':
        const question = { ...questionSet };
        setQuestionSet({ ...question, [name]: value });
        break;

      case '0':
        const questionoption0 = { ...questionSet };
        questionoption0.options[0] = value;
        setQuestionSet(questionoption0);
        break;

      case '1':
        const questionoption1 = { ...questionSet };
        questionoption1.options[1] = value;
        setQuestionSet(questionoption1);
        break;

      case '2':
        const questionoption2 = { ...questionSet };
        questionoption2.options[2] = value;
        setQuestionSet(questionoption2);
        break;

      case '3':
        const questionoption3 = { ...questionSet };
        questionoption3.options[3] = value;
        setQuestionSet(questionoption3);
        break;

      case 'correctoption':
        const questionCorrectOption = { ...questionSet };

        switch (value) {
          case 'A':
            questionCorrectOption.correctoption = 0;
            break;

          case 'a':
            questionCorrectOption.correctoption = 0;
            break;

          case 'B':
            questionCorrectOption.correctoption = 1;
            break;

          case 'b':
            questionCorrectOption.correctoption = 1;
            break;

          case 'C':
            questionCorrectOption.correctoption = 2;
            break;

          case 'c':
            questionCorrectOption.correctoption = 2;
            break;

          case 'D':
            questionCorrectOption.correctoption = 3;
            break;

          case 'd':
            questionCorrectOption.correctoption = 3;
            break;

          default:
            break;
        }

        setQuestionSet(questionCorrectOption);
        value == 'A' ||
        value == 'B' ||
        value == 'C' ||
        value == 'D' ||
        value == 'a' ||
        value == 'b' ||
        value == 'c' ||
        value == 'd'
          ? setError('')
          : setError('Choose one of the above option');
        console.log(questionSet);
      default:
        break;
    }
  };

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber == 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div class='preparequiz'>
        <h1>Prepare Quiz</h1>
        <hr />
        <div class='quizcontent'>
          <form name='form' onSubmit={handleSubmit}>
            <div class='questiondivision'>
              <h4 class='title'>Question:</h4>
              <div class='form-group'>
                <div class='questioncontent'>
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
                    name='0'
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
                    name='1'
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
                    name='2'
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
                    onChange={handleChange}
                    name='3'
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
                    placeholder='Correct Option'
                    onChange={handleChange}
                    maxLength={1}
                    required
                  />
                  {error && <span class='error'>{error}</span>}
                </div>
              </div>
            </div>
            <div class='navigation'>
              <button type='submit' class='btn btn-primary'>
                Upload
              </button>
              {errorMsg && <span class='error'>Enter valid option!</span>}
            </div>
          </form>
          {ErrorResponseState && (
            <span class='error'>{ErrorResponse} Try Again!</span>
          )}
          {SuccessResponseState && <span class='error'>{SuccessResponse}</span>}
        </div>
      </div>
    );
  }
  function LoginAlert() {
    return (
      <div>
        <h2>User has not logged in / session expired.. Try logging in</h2>
        <Link to='/login'>Login</Link>
      </div>
    );
  }

  return <div>{loginStatus ? <Content /> : <LoginAlert />}</div>;
}

export default PrepareQuiz;
