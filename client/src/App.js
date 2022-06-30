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
          <Route path='/' component={<IndexPage />} />
          <Route path='/login' component={<Login />} />
          <Route path='/register' component={<Register />} />
          <Route path='/home' component={<Home />} />
          <Route path='/adminpanel' component={<AdminPanel />} />
          <Route path='/studentpanel' component={<StudentPanel />} />
          <Route path='/quiz' component={<Quiz />} />
          <Route path='/result' component={<Result />} />
          <Route path='/history' component={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
