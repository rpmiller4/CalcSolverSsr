import React, { useEffect, Component } from "react";
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

export class EllipticalArea extends Component<{}, { [key: string]: number }> {

  constructor(props) {
    super(props);
    this.state = { 
      radialWidth: 1,
      radialHeight: 1,
      area: 1
    };

    this.updateRadialWidth = this.updateRadialWidth.bind(this);
    this.updateRadialHeight = this.updateRadialHeight.bind(this);
    this.calculateArea = this.calculateArea.bind(this);
  }

  updateRadialWidth(e) {
    var theWidth = e.target.value;
    this.setState({ radialWidth: theWidth },
      () => this.setState({area: this.calculateArea(this.state.radialHeight, theWidth)}));
  }

  updateRadialHeight(e) {
    var theHeight = e.target.value;
    this.setState({ radialHeight: theHeight },
      () => this.setState({area: this.calculateArea(theHeight, this.state.radialWidth)}));
  }

  calculateArea = (radialHeight: number, radialWidth: number) => {
    return radialWidth * radialHeight * Math.PI;
  }

  roundNumber = (num: number, dec: number) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }

  renderLeft() {
    return (
      <div>
        <h1>Elliptical Area calculator</h1>
        <p/>
        <TextControl prepend="Radial Width" type="number" value={this.state.radialWidth} append="A" onChange={this.updateRadialWidth} />
        <TextControl prepend="Radial Heigth" type="number" value={this.state.radialHeight} append="B" onChange={this.updateRadialHeight} />
        <TextControl prepend="Area" type="number" value={this.state.area} append="units squared" disabled="true" />
        <p></p>
        <h4>Explanation</h4>
        <p>The distance from the center of this ellipse along the long axis is {this.state.width} (A) and the distance from the center of this ellipse along the short axis is {this.state.height} (B). The formula to get the area of an ellipse is the length of A times the length of B times PI. {this.state.radialWidth} x {this.state.radialHeight} x PI = {this.roundNumber(this.state.area, 2)} units squared.</p>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Rectangular Area Calculator</title>
          <meta name='description' content='Calculate the area of a an ellipse or circle using radial width and radial height.' />
        </Helmet>
        <h3>Calculate the area an ellipse (SR)</h3>
        <p>The area of an ellipse is equal to the radial width of the rectangle times its radial height times PI.</p>
        <p>The area of a circle is the radius times itself times PI.</p>
        <p>The radial width and radial height of a rectangle or the radius of a circle is 1-dimensional. The area is 2-dimensional by definition. So the result of the radial width and the radial height times PI is in squared units. For example, if the radial width is 2 feet and the radial length is also 2 feet, then the area is 12.56 squared feet.</p>
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
