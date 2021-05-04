import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export class StandardDeviation extends Component {
  static displayName = StandardDeviation.name;

  constructor(props) {
    super(props);
    this.state = { populationSd: 0, mean: 0, text: "" };

    this.updateText = this.updateText.bind(this);
    this.average = this.average.bind(this);
    this.calculateMean = this.calculatePopulationStandardDeviation.bind(this);
    this.calculatePopulationStandardDeviation = this.calculatePopulationStandardDeviation.bind(this);
  }

  updateText(e) {
    this.setState({ text: e.target.value },
      () => {
        var pSd = this.calculatePopulationStandardDeviation();
        this.setState({ populationSd: pSd })
      });
  }

  average = (array) => array.reduce((a, b) => Number(a) + Number(b) / array.length, 0);

  

  calculateMean() {
    var values = this.state.text.split(/,|\s/).filter(x => x != "" && x != null && x != " ").map(x=>Number(x));
    if (values == null) {
      this.setState({ mean: NaN });
    } else {
      this.setState({ mean: this.average(values) });
    }
  }

  calculatePopulationStandardDeviation(){
    var values = this.state.text.split(/,|\s/).filter(x => x != "" && x != null && x != " ").map(x=>Number(x));
    var mean = this.average(values);
    var variance = values.reduce(
      (accumulator, value) => accumulator += Math.pow(value - mean, 2), 0) / values.length;
    var populationSd = Math.sqrt(variance);
    console.log(variance);
    console.log(populationSd);
    return populationSd;
  }

  renderLeft() {
    return (
      <div>
        <h1>Set Analyzer</h1>
        <h4>Population Standard Deviation: {this.state.populationSd}</h4>
        <textarea className="form-control" value={this.state.text} rows="10" onChange={this.updateText} />
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Population Standard Deviation Calculator</title>
          <meta name='description' content='Copy and Paste a set of numbers to get the Population Standard Deviation along with other statistics.' />
        </Helmet>
        <h3>Population Standard Deviation</h3>
        <p>The population standard deviation is a measure of dispersion of a set of values. A low standard deviation indicates that values are close to the mean of the population, whereas a high standard deviation indicates that the values are more spread out.</p>
        <p>The standard deviation is written as 'SD' or the greek letter 'sigma'.</p>
        <p>The standard deviation is the square root of the variance of a collection of values. The standard deviation is a summary statistic, like the <Link to="./arithmetic-mean-calculator">arithmetic mean</Link> and as such summarizes and describes the set of numbers it came from.</p>
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
