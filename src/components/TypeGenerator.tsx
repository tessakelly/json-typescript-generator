import React from 'react';
import { printTypes } from '../type-printer'

export default class TypeGenerator extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      input: '{"examples": [{"text": "Hello"}, {"text": "world"}]}',
      result: '',
      valid: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static isValidJson(jsonString: string) {
    try {
      JSON.parse(jsonString);
    } catch(e) {
      return false;
    }
    return true;
  }

  handleInputChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const valid = TypeGenerator.isValidJson(this.state.input);
    this.setState({valid: valid});
    if (valid) {
      this.setState({result: printTypes(this.state.input)});
    }
  }

  handleResultChange(event) {
    this.setState({result: event.target.value});
  }

  render() {
    return (<>
      <div>
        <p>This tool is intended to cut down the amount of time required to describe a complex data structure in TypeScript. Paste some JSON (for example, the response body of a RESTful API you use) into the input and the tool will attempt to generate a set of TypeScript interfaces that accurately describe your data.</p>
        <p>All processing is done client-side—the JSON you input does not leave your browser.</p>
      </div>
      <div className="container">
        <div className="column">
          Input:
          <form onSubmit={this.handleSubmit} className={`input-form ${this.state.valid ? '': 'has-danger'}`}>
            <div className="form-group">
              <textarea value={this.state.input} onChange={this.handleInputChange}
                rows={15}/>
            </div>
            <div className="form-group">
              {!this.state.valid && <p className="form-input-hint">Your input is not valid JSON.</p>}
              <button type="submit" className="btn btn-primary">Generate types</button>
            </div>
          </form>
          
        </div>
        <div className="column">
          Output:
          <pre className="code">
            <textarea readOnly={true} value={this.state.result} onChange={this.handleResultChange} rows={15}/>
          </pre>
        </div>
      </div>
    </>);
  }
}
