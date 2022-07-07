import './IndexPage.css';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function IndexPage() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  
  useEffect(() => {
    const registerNumber = localStorage.getItem('registerNumber');
    if (registerNumber != 'admin') {
      setLoginStatus(true);
    }
  }, []);

  function Content() {
    return (
      <div class='IndexPageContent'>
        <h1 id='progress'>Progress!</h1>
        <button class='buttonLoginRegister' onClick={() => navigate('/login')}>
          Sign-in
        </button>
        <br />
        <br />
        <button
          class='buttonLoginRegister'
          onClick={() => navigate('/register')}
        >
          Sign-up
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

export default IndexPage;
