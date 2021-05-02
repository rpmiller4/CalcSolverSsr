import React, { Component } from 'react';
import { ThreeColumnContainer } from "./Layout/ThreeColumnContainer";
import { Helmet } from 'react-helmet';

export class Percentage extends Component {
  static displayName = Percentage.name;

  constructor(props) {
    super(props);
    this.state = { amount: 0, percent: 0, result: 0 };
    this.updateAmount = this.updateAmount.bind(this);
    this.updatePercent = this.updatePercent.bind(this);
  }

  updateAmount(e) {
    this.setState({ amount: e.target.value }, () => this.calculatePercentage());
  }

  updatePercent(e) {
    this.setState({ percent: e.target.value }, () => this.calculatePercentage());
  }

  calculatePercentage() {
    this.setState({
      result: this.state.amount * this.state.percent / 100
    });
  }

  renderLeft() {
    return (
      <div>
        <h1>Percentage Calculator</h1>
        <div className="input-group">
          <div className="input-group-prepend">
              <span className="input-group-text">Amount</span>
          </div>
          <input className="form-control" type="number" value={this.state.amount} onChange={this.updateAmount} />
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Percent</span>
            </div>
            <input className="form-control" type="number" value={this.state.percent} onChange={this.updatePercent} />
            <div className="input-group-append">
              <span className="input-group-text">%</span>
            </div>
          </div>
          <h2>{this.state.result}</h2>
        </div>
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Percentages Calculator</title>
          <meta name='description' content='Use our calculator to calculate percentages from a given amount.' />
        </Helmet>
        <h3>Calculate percentages</h3>
        <p>The general formula for calculating a percentage is Amount x percentage / 100. Use the calculator on the left to calculate percentages.</p>
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
