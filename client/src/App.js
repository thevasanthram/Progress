import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import StudentPanel from './components/StudentPanel';
import Quiz from './components/Quiz';
import Result from './components/Result';
import History from './components/History';
import PrepareQuiz from './components/PrepareQuiz';
import ScoreCard from './components/ScoreCard';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/preparequiz' element={<PrepareQuiz />} />
          <Route path='/scorecard' element={<ScoreCard />} />
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
