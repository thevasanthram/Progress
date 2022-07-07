import './Result.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Result() {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setScore(localStorage.getItem('score'));
    setTotalQuestions(localStorage.getItem('totalQuestions'));
  }, []);

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber != 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div class='resultcontent'>
        <h1 class='resulttitle'>Result</h1>
        <hr />
        <div class='resultdata'>
          <h2 id='scoredata'>
            You scored {score} out of {totalQuestions}
          </h2>
          <Link to='/studentpanel'>Go to Home</Link>
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

export default Result;
