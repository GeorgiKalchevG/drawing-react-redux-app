import React from 'react';
import PropTypes from 'prop-types';
import {
  CIRCLE,
  FILL,
  FREE_LINE,
  RECTANGLE,
  STRAIGHT_LINE,
} from '../actions/index';

const numberOfElementsToExtract = 20;

class DrawingArea extends React.Component {
  static extractLast(array, numberOfElements) {
    return array.slice(array.length - numberOfElements);
  }

  constructor(props) {
    super(props);
    this.state = {
      ctx: {},
      shouldDraw: false,
      undoImageArray: [],
      redoImageArray: [],
      width: 0,
      height: 0,
      xStart: 0,
      yStart: 0,
      xCurr: 0,
      yCurr: 0,
      xEnd: 0,
      yEnd: 0,

    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateImageArray = this.updateImageArray.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onMouseMove(e) {
    const xCurr = e.nativeEvent.offsetX;
    const yCurr = e.nativeEvent.offsetY;

    const { shouldDraw, ctx, undoImageArray } = this.state;
    const { tool } = this.props;
    if (shouldDraw) {
      ctx.putImageData(undoImageArray[undoImageArray.length - 1], 0, 0);
      this.draw(tool, xCurr, yCurr, ctx);
    }
  }

  handleMouseDown(e) {
    const xStart = e.nativeEvent.offsetX;
    const yStart = e.nativeEvent.offsetY;
    const {
      ctx,
      width,
      height,
      undoImageArray,
    } = this.state;
    ctx.putImageData(undoImageArray[undoImageArray.length - 1], width, height);
    ctx.lineWidth = this.props.strokeSize;
    ctx.strokeStyle = 'blue';
    this.setState({
      xStart,
      yStart,
      shouldDraw: true,
    });
    console.log(xStart, yStart);
  }

  handleMouseUp(e) {
    const xEnd = e.nativeEvent.offsetX;
    const yEnd = e.nativeEvent.offsetY;
    const { ctx, width, height } = this.state;
    // console.log(xEnd, yEnd);
    const imageArray = this.updateImageArray(ctx, width, height);
    ctx.beginPath();
    this.setState({
      shouldDraw: false,
      undoImageArray: imageArray,
      xEnd,
      yEnd,
    });
  }

  handleUndo() {
    const { undoImageArray, ctx, redoImageArray } = this.state;
    if (undoImageArray.length > 1) {
      const newRedoArray = DrawingArea.extractLast(
        redoImageArray,
        numberOfElementsToExtract,
      );

      newRedoArray.push(undoImageArray.pop());
      this.setState({
        undoImageArray,
        redoImageArray: newRedoArray,
      });
      ctx.putImageData(undoImageArray[undoImageArray.length - 1], 0, 0);
    }
  }

  handleRedo() {
    const { undoImageArray, ctx, redoImageArray } = this.state;

    if (redoImageArray.length > 0) {
      const newUndoArray = DrawingArea.extractLast(
        undoImageArray,
        numberOfElementsToExtract,
      );
      newUndoArray.push(redoImageArray.pop());
      this.setState({
        redoImageArray,
        undoImageArray: newUndoArray,
      });
      ctx.putImageData(newUndoArray[newUndoArray.length - 1], 0, 0);
    }
  }

  draw(tool, xCurr, yCurr, ctx) {
    console.log(tool);
    switch (tool) {
      case CIRCLE:
        this.drawCircle(xCurr, yCurr, ctx);
        break;
      case STRAIGHT_LINE:
        this.drawStraightLine(xCurr, yCurr, ctx);
        break;
      case RECTANGLE:
        this.drawRectangle(xCurr, yCurr, ctx);
        break;
      case FREE_LINE:
        this.drawFreeLine(xCurr, yCurr, ctx);
        break;
      case FILL:
        this.fillSpace(xCurr, yCurr, ctx);
        break;
      default:
        console.log('ERROR');
        break;
    }
  }

  drawCircle(x, y, ctx) {
    const { xStart, yStart } = this.state;
    const radius = Math.sqrt(((xStart - x) ** 2) + ((yStart - y) ** 2));

    ctx.beginPath();
    ctx.arc(xStart, yStart, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawStraightLine(x, y, ctx) {
    const { xStart, yStart } = this.state;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
    ctx.beginPath();
  }

  drawRectangle(x, y, ctx) {
    const { xStart, yStart } = this.state;
    ctx.strokeRect(xStart, yStart, x - xStart, y - yStart);
  }

  drawFreeLine(x, y, ctx) {
    const { width, height } = this.state;
    ctx.lineJoin = 'bevel';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.fill();
    ctx.moveTo(x, y);

    const imageArray = this.updateImageArray(ctx, width, height);
    this.setState({ undoImageArray: imageArray });
  }

  fillSpace(xCurr, yCurr, ctx) {
    const pixel = ctx.getImageData(xCurr, yCurr, 1, 1);
    console.log('pixel ', pixel);
  }

  updateImageArray(ctx, width, height) {
    const { undoImageArray } = this.state;

    const newImageArray = DrawingArea.extractLast(
      undoImageArray,
      numberOfElementsToExtract,
    );

    newImageArray.push(ctx.getImageData(0, 0, width, height));
    return newImageArray;
  }

  updateCanvas() {
    this.canvas.setAttribute(
      'width',
      String(this.canvasContainer.offsetWidth - 20),
    );
    const ctx = this.canvas.getContext('2d');
    const imageArray = this.updateImageArray(
      ctx,
      this.canvasContainer.offsetWidth,
      this.canvasContainer.offsetHeight,
    );

    this.setState({ ctx, undoImageArray: imageArray });
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    this.updateCanvas();
  }

  render() {
    const { tool, strokeSize } = this.props;
    return (

      <div
        role="presentation"
        className="drawing-container"
        ref={(el) => {
          this.canvasContainer = el;
        }}
      >
        <canvas
          className="drawingBoard"
          width="1024"
          height="720"
          ref={(el) => {
            this.canvas = el;
          }}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}

        >
          Your browser does not support the canvas element.
        </canvas>
        <div>
          {this.state.xStart}:{this.state.yStart}
          ------
          {this.state.xCurr}:{this.state.yCurr}
          ------
          {this.state.xEnd}:{this.state.yEnd}
          <br />
          {strokeSize}&lt;--&gt;{tool}
        </div>
        <button onClick={this.handleRedo}>Redo</button>
        <button onClick={this.handleUndo}>Undo</button>
      </div>
    );
  }
}

/** @namespace PropTypes.number */
/** @namespace PropTypes.string */

DrawingArea.propTypes = {
  tool: PropTypes.string.isRequired,
  strokeSize: PropTypes.number.isRequired,
};
export default DrawingArea;
