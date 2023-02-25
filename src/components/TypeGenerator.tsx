import { useState } from 'react';
import { printTypes } from '../type-printer'

function isValidJson(jsonString: string) {
  try {
    JSON.parse(jsonString);
  } catch(e) {
    return false;
  }
  return true;
}

export default function TypeGenerator() {
  const [input, setInput] = useState('{"examples": [{"text": "Hello"}, {"text": "world"}]}');
  const [result, setResult] = useState('');
  const [valid, setValid] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    const valid = isValidJson(input);
    setValid(valid);
    if (valid) {
      setResult(printTypes(input));
    }
  }

  return (<>
    <div>
      <p>This tool is intended to cut down the amount of time required to describe a complex data structure in TypeScript. Paste some JSON (for example, the response body of a RESTful API you use) into the input and the tool will attempt to generate a set of TypeScript interfaces that accurately describe your data.</p>
      <p>All processing is done client-side—the JSON you input does not leave your browser.</p>
    </div>
    <div className="container">
      <div className="column">
        Input:
        <form onSubmit={handleSubmit} className={`input-form ${valid ? '': 'has-danger'}`}>
          <div className="form-group">
            <textarea value={input} onChange={e => setInput(e.target.value)}
              rows={15}/>
          </div>
          <div className="form-group">
            {!valid && <p className="form-input-hint">Your input is not valid JSON.</p>}
            <button type="submit" className="btn btn-primary">Generate types</button>
          </div>
        </form>
        
      </div>
      <div className="column">
        Output:
        <pre className="code">
          <textarea readOnly={true} value={result} rows={15}/>
        </pre>
      </div>
    </div>
  </>);
}
