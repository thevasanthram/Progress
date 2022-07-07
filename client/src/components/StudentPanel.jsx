import './StudentPanel.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function StudentPanel() {
  const [loginStatus, setLoginStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber != 'admin' && registerNumber != null) {
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
        <br />
        <br />
        <button
          class='buttonStudentPanel'
          onClick={() => {
            localStorage.removeItem('registerNumber');
            navigate('/login');
          }}
        >
          Logout
        </button>
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

export default StudentPanel;
