import './IndexPage.css';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function IndexPage() {
  const navigate = useNavigate();

  return (
    <div class='IndexPageContent'>
      <h1 id='progress'>Progress!</h1>
      <button class='buttonLoginRegister' onClick={() => navigate('/login')}>
        Sign-in
      </button>
      <br />
      <br />
      <button class='buttonLoginRegister' onClick={() => navigate('/register')}>
        Sign-up
      </button>
    </div>
  );
}

export default IndexPage;
