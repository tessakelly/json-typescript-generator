import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss';
import TypeGenerator from './components/TypeGenerator';

ReactDOM.render(
  <div>
    <h1>JSON Typescript Generator</h1>
    <TypeGenerator/>
    <div className="text-center">
      <a href="https://github.com/tessakelly/json-typescript-generator">
        <img src="https://cdnjs.cloudflare.com/ajax/libs/octicons/4.4.0/svg/mark-github.svg" width="30" height="30" alt="GitHub repository"/>
      </a>
    </div>
  </div>,
  document.getElementById('root')
);
