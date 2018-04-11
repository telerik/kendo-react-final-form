import React, { Component } from 'react';
import FinalForm from './FinalForm';
// You can import style files in ./App.js and add global styles in ./App.css
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FinalForm />
      </div>
    );
  }
}

export default App;
