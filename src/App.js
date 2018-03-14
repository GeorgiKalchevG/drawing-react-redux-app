import React from 'react';
import ToolsBar from './containers/ToolsBarContainer';
import './App.css';
import DrawingArea from './containers/DrawingAreaContainer';

const App = () => (
  <div className="App">
    <header className="App-header">
      <ToolsBar />
    </header>
    <div className="App-main">
      <DrawingArea />
    </div>
  </div>
);

export default App;
