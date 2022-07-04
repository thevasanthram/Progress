import './Quiz.css';
import React, { useEffect } from 'react';
import { useState } from 'react';

function Quiz() {
  const [questionNo, setQuestionNo] = useState(0);
  const [questionSet, setQuestionSet] = useState([]);
  const [optionChosen, setOptionChosen] = useState('');
  const [ErrorResponse, setErrorResponse] = useState('');
  const [ErrorResponseState, setErrorResponseState] = useState('');

  // let scoreArray = new Array(questionSet.length);
  // console.log(scoreArray);

  const clickNext = () => {
    setQuestionNo(questionNo + 1);
  };

  const clickPrev = () => {
    setQuestionNo(questionNo - 1);
  };

  const handleOptionSelect = (e) => {
    setOptionChosen(e.target.value);
    console.log(optionChosen);
    // if (questionSet[questionNo].correctanswer == optionChosen) {
    //   scoreArray[questionNo] = 1;
    // } else {
    //   scoreArray[questionNo] = 0;
    // }

    // console.log(scoreArray);
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
                      name='radiobutton'
                      value={index}
                      // checked={answers[quesNumber] === key}
                      onClick={handleOptionSelect}
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
              <button id='submitbuttonquiz' class='btn btn-primary'>
                Submit
              </button>
            )}
          </div>
        </div>
      )}

      {ErrorResponseState && <span class='error'>{ErrorResponse} Reload!</span>}
    </div>
  );
}

export default Quiz;
