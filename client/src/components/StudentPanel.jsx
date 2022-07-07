import './StudentPanel.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function StudentPanel() {
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber != 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
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

export default StudentPanel;
