import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { Helmet } from "react-helmet";

export class ArithmeticMean extends Component {
  static displayName = ArithmeticMean.name;

  constructor(props) {
    super(props);
    this.state = { characterCount: 0, mean: 0, text: "" };

    this.updateText = this.updateText.bind(this);
    this.average = this.average.bind(this);
    this.calculateMean = this.calculateMean.bind(this);
  }

  updateText(e) {
    this.setState({ text: e.target.value },
      () => {
        this.calculateMean();
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

  renderLeft() {
    return (
      <div>
        <h1>Set Analyzer</h1>
        <h4>Arithmetic Mean: {this.state.mean}</h4>
        <textarea className="form-control" value={this.state.text} rows="10" onChange={this.updateText} />
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Arithmetic Mean Calculator</title>
          <meta name='description' content='Copy and Paste a set of numbers to get the average or arithmetic mean along with other statistics.' />
        </Helmet>
        <h3>Arithmetic Mean or Average</h3>
        <p>The arithmetic mean, or 'average' is the sum of all the numbers in a set divided by the count of numbers in that set. The average is used to summarize or describe the tendency of that collection, usually from an experiment or study.</p>
        <p>Because the average is so easily skewed by outliers, sometimes the median is used to describe a collection of numbers instead.</p>
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
