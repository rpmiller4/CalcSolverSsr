import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

const c = 299792.458; //km/s

export class TwinParadoxUnderSpecialRelativity extends Component<{}, { [key: string]: number }> {

  constructor(props) {
    super(props);
    this.state = { 
      velocityAsPercentageOfC: 0,
      lorentzFactor: 0,
      velocityInKph: 0,
      velocityInMph: 0,
      elapsedTime: 1,
      dilatedElapsedTime: 1 
    };

    this.calculateLorentzFactor = this.calculateLorentzFactor.bind(this);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.updateLorentzFactor = this.updateLorentzFactor.bind(this);
    this.calculateVelocityAsPercentageOfC = this.calculateVelocityAsPercentageOfC.bind(this); 
    this.calculateTimeDilation = this.calculateTimeDilation.bind(this);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
  }
  

  updateVelocity(e) {
    var velocityAsPctOfC = e.target.value;
    var lorentzF = this.calculateLorentzFactor(velocityAsPctOfC);
    var kph = this.convertToKmh(velocityAsPctOfC);
    var mph = this.convertToMph(kph)
    var dilatedTime = this.calculateTimeDilation(this.state.elapsedTime);
    this.setState({ velocityAsPercentageOfC: velocityAsPctOfC, lorentzFactor: lorentzF, velocityInKph: kph, velocityInMph: mph, dilatedElapsedTime: dilatedTime});
  }

  updateLorentzFactor(e) {
    var lorentzF = e.target.value;
    var velocityAsPctOfC = this.calculateVelocityAsPercentageOfC(lorentzF);
    var kph = this.convertToKmh(velocityAsPctOfC);
    var mph = this.convertToMph(kph)
    var dilatedTime = this.calculateTimeDilation(this.state.elapsedTime);
    this.setState({ velocityAsPercentageOfC: velocityAsPctOfC, lorentzFactor: lorentzF, velocityInKph: kph, velocityInMph: mph, dilatedElapsedTime: dilatedTime});
  }

  updateElapsedTime(e) {
    var elapsed = e.target.value;
    var dilatedTime = this.calculateTimeDilation(elapsed);
    this.setState({ elapsedTime: elapsed, dilatedElapsedTime: dilatedTime });
  }

  calculateLorentzFactor(velocityAsPercentageOfC: number) {
    return 1 / Math.sqrt( 1 - ( Math.pow( velocityAsPercentageOfC / 100, 2) ) );
  }

  calculateVelocityAsPercentageOfC(lorentzFactor: number) {
    return Math.sqrt(-1 * (Math.pow(1/lorentzFactor, 2) -1)) * 100;
  }

  convertToKmh(velocityAsPercentageOfC: number){
    return velocityAsPercentageOfC * c;
  }

  convertToMph(kilometersPerHour: number)
  {
    return kilometersPerHour * 0.621371;
  }

  calculateTimeDilation(elapsedTime: number)
  {
    return elapsedTime / this.state.lorentzFactor;
  }


  renderLeft() {
    return (
      <div>
        <h1>Twin Paradox (Time Dilation under SR) Calculator</h1>
        <p/>
        <TextControl prepend="Relative velocity as % of c" type="number" value={this.state.velocityAsPercentageOfC} append="v" onChange={this.updateVelocity} />
        <TextControl prepend="Lorentz Factor" type="number" value={this.state.lorentzFactor} append="gamma" onChange={this.updateLorentzFactor} />
        <TextControl prepend="Velocity in km/h" type="number" value={this.state.velocityInKph} append="km/h" readonly/>
        <TextControl prepend="Velocity in mph" type="number" value={this.state.velocityInMph} append="mph" readonly />
        <TextControl prepend="Earth Observer Elapsed Time" type="number" value={this.state.elapsedTime} append="Tb" onChange={this.updateElapsedTime} />
        <TextControl prepend="Spaceship Traveler Elapsed Time" type="number" value={this.state.dilatedElapsedTime} append="Ta" readonly/>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Time Dilation Calculator (Twin Paradox)</title>
          <meta name='description' content='Calculate the Lorenz factor based on given velocity or percentage of the speed of light to measure time dilation in special relativity.' />
        </Helmet>
        <h3>Calculate Time Dilation (SR)</h3>
        <p>Time Dilation is the time difference between two clocks or observers moving relative to each other. Time Dilation has practical consequences at very fast relative speeds, in particular for GPS and other satelites. The formula to calculate time dilation is Sqrt(1 - v^2 / c^2) where v is relative velocity and c is the speed of light. The result is called the Lorenz factor.</p>
        <p>Time Dilation means that someone traveling at very high speeds will "experience" time at a slower rate than someone in a frame at rest. So at speeds approaching the speed of light a traveler will age more slowly than someone observing from earth. The closer the traveler gets to the speed of light, the more dramatic the effect, so the traveler could experience and age only a year while everyone on earth ages and experiences eight years.</p>
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
