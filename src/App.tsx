import React, { Fragment } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <Fragment>
      <h1 className='header'>Tic Tac Toe</h1>
      <div className='header'><a href="https://github.com/mayur2503/tic-tac-toe">View source code</a></div>
      <Board/>
    </Fragment>
  );
}

export default App;
