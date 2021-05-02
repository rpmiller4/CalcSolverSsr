import React, { Component } from 'react';
import { ThreeColumnContainer } from './Layout/ThreeColumnContainer';
import { Helmet } from 'react-helmet';

export class RandomNumberGenerator extends Component {
  static displayName = RandomNumberGenerator.name;

  constructor(props) {
    super(props);
    this.state = { zeroOne: 0, min: 1, max: 6, roundToInteger: false, copyToCsvArea: false, nBetweenMinMax: 0, csv: "" };
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.generateRandomNumberBetween = this.generateRandomNumberBetween.bind(this);
    this.updateRoundToInteger = this.updateRoundToInteger.bind(this);
    this.updateCopyToCsvArea = this.updateCopyToCsvArea.bind(this);
    this.updateMaxNumber = this.updateMaxNumber.bind(this);
    this.updateMinNumber = this.updateMinNumber.bind(this);
    this.updateCsv = this.updateCsv.bind(this);
    this.renderLeft = this.renderLeft.bind(this);

  }

  updateMinNumber(e) {
    this.setState({
      min: Number(e.target.value)
    });
  }

  updateMaxNumber(e) {
    this.setState({
      max: Number(e.target.value)
    });
  }

  updateRoundToInteger(e) {
    this.setState({
      roundToInteger: e.target.checked
    });
  }

  updateCopyToCsvArea(e) {
    this.setState({
      copyToCsvArea: e.target.checked
    });
  }

  updateCsv(e) {
    this.setState({
      csv: e.target.value
   });
  }

  generateRandomNumber() {
    this.setState({
      zeroOne: Math.random()
    });
  }

  generateRandomNumberBetween() {
    var generatedNumber = (Math.random() * (this.state.max - this.state.min)) + this.state.min;
    if (this.state.roundToInteger) {
      generatedNumber = (Math.random() * (this.state.max - this.state.min + 1)) + this.state.min;
      generatedNumber = Math.floor(generatedNumber);
    }
    this.setState({ nBetweenMinMax: generatedNumber }, this.addCsv(generatedNumber));
  }

  addCsv(number) {
    if (this.state.copyToCsvArea) {
      this.setState({ csv: this.state.csv + number + ", " });
    }
  }

  renderLeft() {
    return (
      <div>
        <h1>Random Number Generators</h1>
        <button className="btn btn-outline-primary" onClick={() => this.generateRandomNumber()}>Generate Number between 0 and 1</button>
        <h2>{this.state.zeroOne}</h2>

        <button className="btn btn-outline-primary" onClick={() => this.generateRandomNumberBetween()}>Generate Number between</button>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Min</span>
          </div>
          <input className="form-control" type="number" value={this.state.min} onChange={this.updateMinNumber} />
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Max</span>
          </div>
          <input className="form-control" type="number" value={this.state.max} onChange={this.updateMaxNumber} />
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked={this.state.roundToInteger} onChange={this.updateRoundToInteger} id="roundToIntegerCheckbox"></input>
          <label class="form-check-label" for="roundToIntegerCheckbox">
            round to integer
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked={this.state.copyToCsvArea} onChange={this.updateCopyToCsvArea} id="copyToCsvCheckbox"></input>
          <label class="form-check-label" for="copyToCsvCheckbox">
            copy to csv
          </label> 
        </div>
        <h2>{this.state.nBetweenMinMax}</h2>
        <textarea className="form-control" value={this.state.csv} rows="10" onChange={this.updateCsv} />
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Random Number Generator</title>
          <meta name='description' content='Generate Random Numbers between 0 and 1 or any other range.' />
        </Helmet>
        <h3>Generate pseudo-random numbers</h3>
        <p>On the left select a minimum and maximum value, and click the button to get a random number in between.
          Some use cases include simulating a coin flip, a six-sided die or a 200-sided die.</p>
        <p>Random values can be used for testing software, running simulations, creating generative art, composing artificially generated music, etc.</p>
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
