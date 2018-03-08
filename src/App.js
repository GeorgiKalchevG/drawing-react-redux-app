import React from 'react';
import ToolsBar from './containers/ToolsBar';
import './App.css';
import DrawingArea from './containers/DrawingArea';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ToolsBar/>
                </header>
                <div className="App-main">
                    <DrawingArea/>
                </div>
            </div>
        );
    }
}

export default App;
