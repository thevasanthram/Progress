import './ScoreCard.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function ScoreCard() {
  const [scorecard, setScoreCard] = useState([]);
  useEffect(async () => {
    const response = await fetch('http://localhost:5000/scorecard', {
      method: 'GET',
    });

    const data = await response.json();
    if (data.status == 'error') {
      setErrorResponse(data.error);
      setErrorResponseState(true);

      setTimeout(() => {
        setErrorResponseState(false);
      }, 5000);
    } else {
      setScoreCard(data.data);
    }
  }, []);
  return (
    <div>
      <div class='scorecard'>
        <h1>ScoreCard</h1>
        <hr />
        {}
        <div class='singlecard'></div>
      </div>
    </div>
  );
}

export default ScoreCard;
