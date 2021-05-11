import React, { useEffect, Component } from "react";
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

export class PythagoreanTheorem extends Component<{}, { [key: string]: number }> {

  constructor(props) {
    super(props);
    this.state = { 
      a: 3,
      b: 4,
      hypotenuse: 5
    };

    this.calculateHypotenuse = this.calculateHypotenuse.bind(this);
    this.calculateSideB = this.calculateSideB.bind(this);
    this.updateA = this.updateA.bind(this);
    this.updateB = this.updateB.bind(this);
    this.updateHypotenuse = this.updateHypotenuse.bind(this);
  }

  updateA(e) {
    var sideA = e.target.value;
    this.setState({ a: sideA },
      () => this.setState({ hypotenuse: this.calculateHypotenuse(sideA, this.state.b)}));
  }

  updateB(e) {
    var sideB = e.target.value;
    this.setState({ b: sideB },
      () => this.setState({ hypotenuse: this.calculateHypotenuse(this.state.a, sideB)}));
  }
  updateHypotenuse(e) {
    var h = e.target.value;
    this.setState({ hypotenuse: h },
      () => this.setState({b: this.calculateSideB(this.state.a, this.state.hypotenuse)}));
  }

  calculateHypotenuse = (sideA: number, sideB: number) => {
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
  }

  calculateSideB = (sideA: number, hypotenuse: number) => {
    return Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(sideA, 2));
  }

  roundNumber = (num: number, dec: number) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }

  renderLeft() {
    return (
      <div>
        <h1>Pythagorean Theorem Calculator</h1>
        <p/>
        <TextControl prepend="Side A" type="number" value={this.state.a} onChange={this.updateA} />
        <TextControl prepend="Side B" type="number" value={this.state.b} onChange={this.updateB} />
        <TextControl prepend="Hypotenuse" type="number" value={this.state.hypotenuse} onChange={this.updateHypotenuse} />
        <p></p>
        <h4>Explanation</h4>
        <p>If sides A and B meet at a 90 degree angle, then the length of the hypotenuse is the square root of {this.roundNumber(this.state.a,2)} (A) squared plus {this.roundNumber(this.state.b, 2)} (B) squared. The length of the hypotenuse then equals {this.roundNumber(this.state.hypotenuse, 2)} units.</p>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Pythagorean Theorem Calculator</title>
          <meta name='description' content='Calculate the hypotenuse or side of a right triangle.' />
        </Helmet>
        <h3>Calculate the hypotenuse of right triangle </h3>
        <p>The pythagorean theorem says that the long side or hypotenuse squared will be equal to the base A squared plus the height of side B squared.</p>
        <p>The pythagorean theorem has numerous practical applications and its math surfaces everywhere in physics.</p>
        <p></p>
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
