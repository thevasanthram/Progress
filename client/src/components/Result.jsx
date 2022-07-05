import './Result.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Result() {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    setScore(localStorage.getItem('score'));
    setTotalQuestions(localStorage.getItem('totalQuestions'));
  }, []);
  return (
    <div class='resultcontent'>
      <h1>Result</h1>
      <hr />
      <div class='resultdata'>
        <h2>
          You scored {score} out of {totalQuestions}
        </h2>
        <Link to='/studentpanel'>Go to Home</Link>
      </div>
    </div>
  );
}

export default Result;
