import './ScoreCard.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ScoreCard() {
  const [scorecard, setScoreCard] = useState([]);
  const [errorResponse, setErrorResponse] = useState('');
  const [errorResponseState, setErrorResponseState] = useState(false);

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    async function scorecardapi() {
      console.log('entering');
      const response = await fetch('http://localhost:5000/scorecard', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      console.log('response: ', response);
      const data = await response.json();
      if (data.status == 'error') {
        setErrorResponse(data.error);
        setErrorResponseState(true);
      } else {
        setScoreCard(data.data);
      }
    }

    scorecardapi();
  }, []);

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber == 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div>
        <div class='scorecard'>
          <h1>ScoreCard</h1>
          <hr />
          <div class='scorecardinnerdivision'>
            {scorecard.map((card) => {
              return (
                <div class='singlecard'>
                  <h4>Student Register Number: {card.studentRollNo}</h4>
                  <hr />
                  {card.quiz.map((singleQuiz) => {
                    return (
                      <div class='quizdetails'>
                        <h5>Score: {singleQuiz.score}</h5>
                        <h5>Time: {singleQuiz.time}</h5>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {errorResponseState && (
              <div class='errorResponseScoreCard'>
                <h3>{errorResponse}</h3>
              </div>
            )}
          </div>
        </div>
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

export default ScoreCard;
