import './StudentPanel.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentPanel() {
  const navigate = useNavigate();
  return (
    <div class='StudentPanelContent'>
      <h1 id='progress'>Progress!</h1>
      <button class='buttonStudentPanel' onClick={() => navigate('/quiz')}>
        Take Test
      </button>
      <br />
      <br />
      <button class='buttonStudentPanel' onClick={() => navigate('/history')}>
        History
      </button> 
    </div>
  );
}

export default StudentPanel;
