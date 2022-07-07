import './History.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState({});
  const [errorResponse, setErrorResponse] = useState('');
  const [errorResponseState, setErrorResponseState] = useState(false);
  const [readyForRender, setReadyForRender] = useState(false);

  const [loginStatus, setLoginStatus] = useState(false);

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
        setReadyForRender(true);
      }
    }

    fetchHistory();
  }, []);

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber != 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
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

export default History;
