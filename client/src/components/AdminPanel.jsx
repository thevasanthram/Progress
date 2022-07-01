import './AdminPanel.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div class='AdminPanelContent'>
      <h1 id='progress'>Progress!</h1>
      <button class='buttonAdminPanel' onClick={() => navigate('/preparequiz')}>
        Prepare Quiz
      </button>
      <br />
      <br />
      <button class='buttonAdminPanel' onClick={() => navigate('/scorecard')}>
        Score Card
      </button>
    </div>
  );
}

export default AdminPanel;
