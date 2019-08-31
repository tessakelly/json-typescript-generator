import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss';
import Guesser from './components/Guesser';

ReactDOM.render(
  <div>
    <h1>JSON Typescript Guesser</h1>
    <Guesser/>
    <a href="https://github.com/mchalk/json-typescript-guesser" className="centered">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mark-github.svg" width="30" height="30" className="centered"/>
    </a>
  </div>,
  document.getElementById('root')
);
