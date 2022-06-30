import './App.css';
import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path='/' component={IndexPage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home} />
        <Route path='/adminpanel' component={AdminPanel} />
        <Route path='/studentpanel' component={StudentPanel} />
        <Route path='/quiz' component={Quiz} />
        <Route path='/result' component={Result} />
        <Route path='/history' component={History} />
      </BrowserRouter>
    </div>
  );
}

export default App;
