import React, { Component } from 'react';
import { ThreeColumnContainer } from "./Layout/ThreeColumnContainer";
import { Helmet } from 'react-helmet';

export class BodyMassIndex extends Component {
  static displayName = BodyMassIndex.name;

  constructor(props) {
    super(props);
    this.state = { weight: 0, height: 0, BMI: 0, massUnits: "lbs", heightUnits: "inches" };
    this.updateWeight = this.updateWeight.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.updateBMI = this.updateBMI.bind(this);
    this.updateHeightUnits = this.updateHeightUnits.bind(this);
    this.updateMassUnits = this.updateMassUnits.bind(this);
  }

  getState() {
    console.dir(this.state);
  }

  updateWeight(e) {
     this.setState({ weight: e.target.value }, () => this.updateBMI());
  }
  

  updateHeight(e) {
    this.setState({ height: e.target.value }, () => this.updateBMI());
  }

  updateHeightUnits(e) {
    this.setState({ heightUnits: e.target.value }, () => this.updateBMI());
  }

  updateMassUnits(e) {
    this.setState({ massUnits: e.target.value }, () => this.updateBMI());
  }

  convertPoundsToKilograms(valueInPounds) {
    return 0.45359237 * valueInPounds;
  }

  convertInchesToCentimeters(valueInInches) {
    return 2.54 * valueInInches;
  }

  updateBMI() {

    var weight;
    if (this.state.massUnits === "kg") {
      weight = this.state.weight;
    }
    else {
      weight = this.convertPoundsToKilograms(this.state.weight);
    }
    var height;
    if (this.state.heightUnits === "cm") {
      height = this.state.height;
    } else {
      height = this.convertInchesToCentimeters(this.state.height);
    }

    this.setState({
        BMI: weight / Math.pow(height / 100, 2)
    });

  }
  
  renderLeft() {
    return (
      <div>
        <h1>BMI Calculator</h1>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Weight</span>
          </div>
          <input className="form-control" type="number" min="0" value={this.state.weight} onChange={this.updateWeight} />
          <select className="custom-select col-2" value={this.state.massUnits} onChange={this.updateMassUnits}>
            <option defaultValue value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Height</span>
          </div>
          <input className="form-control" type="number" min="0" value={this.state.height} onChange={this.updateHeight} />
          <select className="custom-select col-2" value={this.state.heightUnits} onChange={this.updateHeightUnits}>
            <option defaultValue value="inches">inches</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <h2>{roundNumber(this.state.BMI, 1)} <span className="small">kg / m^2</span></h2>

      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Body Mass Index (BMI) Calculator</title>
          <meta name='description' content='Calculate your BMI or Body Mass Index easily.' />
        </Helmet>
        <h3>Calculate a body mass index (BMI)</h3>
        <p>The formula for calculating body mass index is mass divided by height squared when measured in kg/m^2. A typical healthy BMI ranges around 18.5 - 24.9 kg/m^2, but may vary widely for people who exercise professionally. BMI values below 18.5 are interpreted as underweight and values over 24.9 as overweight, and obese when over 30.</p>
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

function roundNumber(num, dec) {
  return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}
