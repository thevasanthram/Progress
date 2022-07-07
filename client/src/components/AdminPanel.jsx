import './AdminPanel.css';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AdminPanel() {
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber == 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div class='AdminPanelContent'>
        <h1 id='progress'>Progress!</h1>
        <button
          class='buttonAdminPanel'
          onClick={() => navigate('/preparequiz')}
        >
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

  function LoginAlert() {
    return (
      <div>
        <h2>User has not logged in / session expired.. Try logging in</h2>
        <Link to='/login'>Login</Link>
      </div>
    );
  }

  return <div>{loginStatus ? <Content /> : <LoginAlert />}</div>;
}

export default AdminPanel;
