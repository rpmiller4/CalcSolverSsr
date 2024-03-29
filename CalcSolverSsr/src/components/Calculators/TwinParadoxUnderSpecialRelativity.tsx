import React, { useEffect, Component } from "react";
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

const c = 299792.458; //km/s

export class TwinParadoxUnderSpecialRelativity extends Component<{}, { [key: string]: number }> {

  constructor(props) {
    super(props);
    this.state = { 
      velocityAsPercentageOfC: 0,
      lorentzFactor: 1,
      velocityInKph: 0,
      velocityInMph: 0,
      contractedElapsedTime: 1,
      dilatedElapsedTime: 1 
    };

    this.calculateLorentzFactor = this.calculateLorentzFactor.bind(this);
    this.updateVelocity = this.updateVelocity.bind(this);
    this.updateLorentzFactor = this.updateLorentzFactor.bind(this);
    this.calculateVelocityAsPercentageOfC = this.calculateVelocityAsPercentageOfC.bind(this); 
    this.calculateTimeDilation = this.calculateTimeDilation.bind(this);
    this.updateElapsedTime = this.updateElapsedTime.bind(this);
    this.updateTravelerElapsedTime = this.updateTravelerElapsedTime.bind(this);
    this.calculateTimeContraction = this.calculateTimeContraction.bind(this); 
  }



  updateVelocity(e) {
    var velocityAsPctOfC = e.target.value;
    var lorentzF = this.calculateLorentzFactor(velocityAsPctOfC);
    var kph = this.convertToKmh(velocityAsPctOfC);
    var mph = this.convertToMph(kph)
    //var dilatedTime = 
    this.setState({ velocityAsPercentageOfC: velocityAsPctOfC, lorentzFactor: lorentzF, velocityInKph: kph, velocityInMph: mph},
      () => this.setState({dilatedElapsedTime: this.calculateTimeDilation(this.state.contractedElapsedTime, lorentzF)}));
  }

  updateLorentzFactor(e) {
    var lorentzF = e.target.value;
    var velocityAsPctOfC = this.calculateVelocityAsPercentageOfC(lorentzF);
    var kph = this.convertToKmh(velocityAsPctOfC);
    var mph = this.convertToMph(kph)
    //var dilatedTime = this.calculateTimeDilation(this.state.elapsedTime);
    this.setState({ velocityAsPercentageOfC: velocityAsPctOfC, lorentzFactor: lorentzF, velocityInKph: kph, velocityInMph: mph},
      () => this.setState({dilatedElapsedTime: this.calculateTimeDilation(this.state.contractedElapsedTime, lorentzF)}));
  }

  updateTravelerElapsedTime(e) {
    var elapsed = e.target.value;
    this.setState({contractedElapsedTime: elapsed},
      () => this.setState({dilatedElapsedTime: this.calculateTimeDilation(this.state.contractedElapsedTime, this.state.lorentzFactor)}));
  }

  updateElapsedTime(e) {
    var dilatedTime = e.target.value;
    this.setState({ dilatedElapsedTime: dilatedTime },
     () => this.setState({contractedElapsedTime: this.calculateTimeContraction(this.state.dilatedElapsedTime, this.state.lorentzFactor)}));
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

  calculateTimeContraction(contractedElapsedTime: number, lorentzFactor: number)
  {
    return contractedElapsedTime / lorentzFactor;
  }

  calculateTimeDilation(dilatedElapsedTime: number, lorentzFactor: number)
  {
    return dilatedElapsedTime * lorentzFactor;
  }

  roundNumber = (num: number, dec: number) => {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  }


  renderLeft() {
    return (
      <div>
        <h1>Twin Paradox (Time Dilation under SR) Calculator</h1>
        <p/>
        <TextControl prepend="Relative velocity as % of c" type="number" value={this.state.velocityAsPercentageOfC} append="v" onChange={this.updateVelocity} />
        <TextControl prepend="Lorentz Factor" type="number" value={this.state.lorentzFactor} append="gamma" onChange={this.updateLorentzFactor} />
        <TextControl prepend="Velocity in kph" type="number" value={this.state.velocityInKph} append="kph" readonly="true" />
        <TextControl prepend="Velocity in mph" type="number" value={this.state.velocityInMph} append="mph" readonly="true" />
        <TextControl prepend="Earth Observer Elapsed Time" type="number" value={this.state.dilatedElapsedTime} append="Tb" onChange={this.updateElapsedTime} />
        <TextControl prepend="Spaceship Traveler Elapsed Time" type="number" value={this.state.contractedElapsedTime} append="Ta" onChange={this.updateTravelerElapsedTime}/>
        <p></p>
        <h4>Explanation</h4>
        <p>At {this.roundNumber(this.state.velocityAsPercentageOfC,0)}% of the speed of light (c), the lorentz factor or gamma is {this.roundNumber(this.state.lorentzFactor,4)}. That means a twin traveling through space will age at {this.roundNumber(1 / this.state.lorentzFactor * 100,4)}% the rate of its twin at relative rest on earth. If {this.roundNumber(this.state.dilatedElapsedTime,4)} units of time have passed on earth, {this.roundNumber(this.state.contractedElapsedTime,2)} units of time will pass for the space twin. For this to be realistic, the space twin needs to travel at {this.roundNumber(this.state.velocityInMph/1000,0)}K miles per hour ({this.roundNumber(this.state.velocityInKph/1000,0)}K kilometers per hour).</p>
        <p>Interestingly, the spaceship - and everything in it - will also contract in length to {this.roundNumber(1 / this.state.lorentzFactor * 100,2)}% of its original length.</p>
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
