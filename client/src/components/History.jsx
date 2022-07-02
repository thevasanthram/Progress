import './History.css';
import React, { useState, useEffect } from 'react';

function History() {
  const [history, setHistory] = useState({});
  const [errorResponse, setErrorResponse] = useState('');
  const [errorResponseState, setErrorResponseState] = useState(false);
  const [readyForRender, setReadyForRender] = useState(false);

  console.log('entering history');
  useEffect(() => {
    async function fetchHistory() {
      console.log('entering fetchHistory');
      const registerNumber = localStorage.getItem('registerNumber');
      console.log('register number :', registerNumber);
      const response = await fetch('http://localhost:5000/history', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          studentRollNo: registerNumber,
        }),
      });

      const data = await response.json();
      console.log(('data :', data));

      if (data.status == 'error') {
        setErrorResponse(data.error);
        setErrorResponseState(true);
      } else {
        setHistory(data.data);
      }

      setReadyForRender(true);
    }

    fetchHistory();
  }, []);

  return (
    <div class='history'>
      <h1 class='titlehistory'>History</h1>
      <hr />
      <div class='quizhistory'>
        {readyForRender &&
          history.quiz.map((singleQuiz) => {
            return (
              <div class='singlequiz'>
                <h2>Quiz taken on {singleQuiz.time}</h2>
                <h2>Score: {singleQuiz.score}</h2>
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
  );
}

export default History;
