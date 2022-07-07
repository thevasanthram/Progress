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
          <Route path='/' exact element={<IndexPage />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/adminpanel' exact element={<AdminPanel />} />
          <Route path='/preparequiz' exact element={<PrepareQuiz />} />
          <Route path='/scorecard' exact element={<ScoreCard />} />
          <Route path='/studentpanel' exact element={<StudentPanel />} />
          <Route path='/quiz' exact element={<Quiz />} />
          <Route path='/result' exact element={<Result />} />
          <Route path='/history' exact element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
