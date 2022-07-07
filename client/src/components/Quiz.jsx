import './Quiz.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Quiz() {
  const [questionNo, setQuestionNo] = useState(0);
  const [questionSet, setQuestionSet] = useState([]);
  const [optionChosen, setOptionChosen] = useState({});
  const [ErrorResponse, setErrorResponse] = useState('');
  const [ErrorResponseState, setErrorResponseState] = useState('');

  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  const clickNext = () => {
    setQuestionNo(questionNo + 1);
    // console.log(optionChosen);
  };

  const clickPrev = () => {
    setQuestionNo(questionNo - 1);
  };

  const handleOptionSelect = (e) => {
    setOptionChosen({ ...optionChosen, [questionNo]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let score = 0;
    const totalQuestions = questionSet.length;
    for (let i = 0; i < questionSet.length; i++) {
      if (questionSet[i].correctanswer == optionChosen[`${i}`]) {
        score = score + 1;
      }
    }
    console.log('score: ', score);
    console.log('Total Questions: ', totalQuestions);

    localStorage.setItem('score', score);
    localStorage.setItem('totalQuestions', totalQuestions);

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();

    const registerNumber = localStorage.getItem('registerNumber');
    await fetch('http://localhost:5000/result', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentRollNo: registerNumber,
        score: `${score}/${totalQuestions}`,
        time: datetime,
      }),
    });

    navigate('/result');
  };

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch('http://localhost:5000/getquestions', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.status == 'error') {
        setErrorResponse(data.error);
        setErrorResponseState(true);
      } else {
        setQuestionSet(data.data);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');

    if (registerNumber != 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div class='quizcontent'>
        <h1 class='quiztitle'>Quiz</h1>
        <hr />

        {questionSet[questionNo] && (
          <div class='question'>
            <h4 class='questionnumber'>Question No: {questionNo + 1}</h4>
            <div class='questiondata'>
              {questionSet[questionNo] && (
                <h4>{questionSet[questionNo].question}</h4>
              )}
            </div>
            <div class='options'>
              {Object.values(questionSet[questionNo].options).map(
                (singleOption, index) => {
                  return (
                    <div className='option'>
                      <input
                        type='radio'
                        key={index}
                        name='radiobutton'
                        value={index}
                        checked={optionChosen[`${questionNo}`] == index}
                        onChange={handleOptionSelect}
                      />
                      <label class='form-check-label' for='exampleRadios1'>
                        <h4> {singleOption}</h4>
                      </label>
                    </div>
                  );
                }
              )}
            </div>
            <div class='navigationbuttonquiz'>
              {questionNo > 0 && (
                <button
                  id='prevbuttonquiz'
                  onClick={clickPrev}
                  class='btn btn-primary'
                >
                  Prev
                </button>
              )}
              {questionNo < questionSet.length - 1 && (
                <button
                  id='nextbuttonquiz'
                  onClick={clickNext}
                  class='btn btn-primary'
                >
                  Next
                </button>
              )}
              {questionNo + 1 == questionSet.length && (
                //validate option for last question manually
                <button
                  onClick={handleSubmit}
                  id='submitbuttonquiz'
                  class='btn btn-primary'
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {ErrorResponseState && (
          <h3 class='errorresponsequiz'>{ErrorResponse} Reload!</h3>
        )}
      </div>
    );
  }

  function LoginAlert() {
    return (
      <div class='loginerror'>
        <div class='loginerrorcontent'>
          <h2>User has not logged in / session expired..</h2>
          <h2>Try logging in</h2>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    );
  }

  return <div>{loginStatus ? <Content /> : <LoginAlert />}</div>;
}

export default Quiz;
