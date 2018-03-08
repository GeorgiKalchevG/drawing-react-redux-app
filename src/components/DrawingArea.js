import React from 'react';

class DrawingArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xStart: 0,
            yStart: 0,

        };
        this.onMouseMove = this.onMouseMove.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.updateCanvas = this.updateCanvas.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentDidMount() {
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
        this.updateCanvas();
    }

    updateCanvas() {
        console.log("|||", this.canvasContainer.offsetWidth);
        console.log("|", this.state.width);
        this.canvas.setAttribute('width', (this.canvasContainer.offsetWidth - 20));
        const ctx = this.canvas.getContext('2d');
        ctx.fillRect(0, 0, 50, 1000);
    }

    onMouseMove(e) {
        const xStart = e.nativeEvent.offsetX;
        const yStart = e.nativeEvent.offsetY;
        console.log(xStart, yStart);
        this.setState({
            xStart,
            yStart
        });
    }


    render() {
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
                    //onMouseDown={this.handleMouseDown}
                    //onMouseUp={this.handleMouseUp}

                >
                    Your browser does not support the canvas element.
                </canvas>
                <br/>
                {this.state.xStart}:{this.state.yStart}
            </div>
        );
    }
}

export default DrawingArea;
