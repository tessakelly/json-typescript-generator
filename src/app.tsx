import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app.scss';
import genTypes from './type-guess'

class Guesser extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '{"example": "Hello world"}',
      result: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({result: genTypes(this.state.value)});
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column col-6 col-sm-12">
            <div className="form-group">
              <textarea value={this.state.value} onChange={this.handleChange} className="form-input"
                rows={10}/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Generate types</button>
            </div>
          </form>
          <div className="column col-6 col-sm-12">
            <p>This tool is intended to cut down the amount of time to describe a complex data structure in Typescript. Paste some JSON (for example, the response body of a RESTful API you use) into the input and the tool will attempt to generate a set of Typescript interfaces that accurately describe your data.</p>
            <p>All processing is done client-side, the JSON you input does not leave your browser.</p>
          </div>
        </div>
        <div>
          Output:
          <pre className="code">
            <code>{this.state.result}</code>
          </pre>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Guesser/>,
  document.getElementById('root')
);
