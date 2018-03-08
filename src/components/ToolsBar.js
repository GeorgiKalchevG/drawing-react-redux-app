import React from 'react';
import {CIRCLE, FREE_LINE, RECTANGLE, STRAIGHT_LINE} from '../actions';

class ToolsBar extends React.Component {
    render() {

        const {tool, strokeSize, selectTool, changeStrokeSize} = this.props;

        function handleToolSelect(e) {
            selectTool(e.target.value);
        }

        function handleStrokeSizeChange(e) {
            console.log(e.target);
            changeStrokeSize(e.target.value);

        }

        return (
            <div>

                <div
                    className="instruments"
                    onChange={handleToolSelect}
                >
                    <ul>
                        <li>
                            <label htmlFor="tool-line">
                                <input
                                    itemID="tool-line"
                                    type="radio"
                                    value={STRAIGHT_LINE}
                                    name="tools"
                                    defaultChecked={tool === STRAIGHT_LINE}
                                />
                                Line
                            </label>
                        </li>
                        <li>
                            <label htmlFor="tool-square">
                                <input
                                    itemID="tool-square"
                                    type="radio"
                                    value={RECTANGLE}
                                    name="tools"
                                />
                                Square
                            </label>
                        </li>
                        <li>
                            <label htmlFor="tool-free">
                                <input
                                    itemID="tool-free"
                                    type="radio"
                                    value={FREE_LINE}
                                    name="tools"
                                />
                                Free Line
                            </label>
                        </li>
                        <li>
                            <label htmlFor="tool-free">
                                <input
                                    itemID="tool-free"
                                    type="radio"
                                    value={CIRCLE}
                                    name="tools"
                                />
                                CIRCLE
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="range">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={strokeSize}
                        onChange={handleStrokeSizeChange}
                    />
                    {strokeSize}
                </div>
                {/*<div className="coordinates">*/}
                    {/*<h1>{xStart},{yStart}</h1>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<button onClick={App.resetCanvas}>RESET</button>*/}
                {/*</div>*/}
            </div>

        );
    }
}

export default ToolsBar;