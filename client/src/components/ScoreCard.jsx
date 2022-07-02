import './ScoreCard.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function ScoreCard() {
  const [scorecard, setScoreCard] = useState([]);
  const [errorResponse, setErrorResponse] = useState('');
  const [errorResponseState, setErrorResponseState] = useState(false);

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
                { card.quiz.map((singleQuiz) => {
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

export default ScoreCard;
