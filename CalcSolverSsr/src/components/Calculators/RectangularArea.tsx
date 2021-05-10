import React, { useEffect, Component } from "react";
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

export class RectangularArea extends Component<{}, { [key: string]: number }> {

  constructor(props) {
    super(props);
    this.state = { 
      width: 1,
      height: 1,
      area: 1
    };

    this.updateWidth = this.updateWidth.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.calculateArea = this.calculateArea.bind(this);
  }

  updateWidth(e) {
    var theWidth = e.target.value;
    this.setState({ width: theWidth },
      () => this.setState({area: this.calculateArea(this.state.height, theWidth)}));
  }

  updateHeight(e) {
    var theHeight = e.target.value;
    this.setState({ height: theHeight },
      () => this.setState({area: this.calculateArea(theHeight, this.state.width)}));
  }

  calculateArea = (height: number, width: number) => {
    return width * height;
  }

  roundNumber = (num: number, dec: number) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }

  renderLeft() {
    return (
      <div>
        <h1>Rectangular Area calculator</h1>
        <p/>
        <TextControl prepend="Width" type="number" value={this.state.width} append="units" onChange={this.updateWidth} />
        <TextControl prepend="Heigth" type="number" value={this.state.height} append="units" onChange={this.updateHeight} />
        <TextControl prepend="Area" type="number" value={this.state.area} append="units squared" disabled="true" />
        <p></p>
        <h4>Explanation</h4>
        <p>The width of this rectangle is {this.state.width} and the height is {this.state.height}. The formula to get the area of a rectangle is width times height and the result is in squared units. {this.state.width} x {this.state.height} = {this.state.area} units squared.</p>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Rectangular Area Calculator</title>
          <meta name='description' content='Calculate the area of a rectangle or square using width and height.' />
        </Helmet>
        <h3>Calculate the area a rectangle (SR)</h3>
        <p>The area of a rectangle is equal to the width of the rectangle times its height.</p>
        <p>The area of a square is the length of any side times itself.</p>
        <p>The width and height of a rectangle or the side of a square is 1-dimensional. The area is 2-dimensional by definition. So the result of the width and the height is in units squared. For example, if the width is 2 feet and the length is also 2 feet, then the area is 4 squared feet.</p>
      </div>
    );
  }

  render() {

    return (
      <div>
        <ThreeColumnContainer
          left={this.renderLeft()} middle={this.renderMiddle()}></ThreeColumnContainer>
      </div >
    );
  }
}
