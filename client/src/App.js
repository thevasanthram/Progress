import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import StudentPanel from './components/StudentPanel';
import Quiz from './components/Quiz';
import Result from './components/Result';
import History from './components/History';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/studentpanel' element={<StudentPanel />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/result' element={<Result />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
