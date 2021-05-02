import React, { Component } from 'react';
import { ThreeColumnContainer } from "./Layout/ThreeColumnContainer";
import { Helmet } from 'react-helmet';
import { TextControl } from './controls/Input';


export class Percentage extends Component {
  static displayName = Percentage.name;

  constructor(props) {
    super(props);
    this.state = { amount: 100, percent: 50, result: 0 };
    this.updateAmount = this.updateAmount.bind(this);
    this.updatePercent = this.updatePercent.bind(this);
    this.calculatePercentage = this.calculatePercentage.bind(this);
    this.calculatePercentage();
  }

  componentDidMount(){
    this.calculatePercentage();
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
        <TextControl prepend="Amount" type="number" value={this.state.amount} onChange={this.updateAmount} />
        <TextControl prepend="Percent" type="number" value={this.state.percent} onChange={this.updatePercent} append="%" />
        <h2>{this.state.result}</h2>
        <h3>Framed in other ways:</h3>
        <p><b>{this.state.percent}%</b> of <b>{this.state.amount}</b> is <b>{this.state.result}</b></p>
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
        <p>The general formula for calculating a percentage is Amount * percentage / 100. Percent comes from the latin "per centum" which means "by a hundred". Every ratio can be expressed in terms of a hundred parts; for example, half is 50 percent. To calculate half of an amount, we divide the percentage amount by 100 to get .5 after moving the decimal point two places, and now we can multiply the amount times .5. As an example, if we have 600 ducks we can calculate 600 * .5 = 300.</p>
        <p>Percentages can also be higher than 100. When a percentage is higher than 100 the resulting amount will increase instead of decrease. When a stock increases 5%, we are really talking about 105% of the original amount. Using the same formula 600 dollars times 105 / 100 = 600 * 1.05 = 630 dollars. 30 dollars is 5% of 600 and 630 is 105% of 600.</p>
        <h4>Ratios</h4>
        <p>Because percentages are ratios, one half (1/2) is the same as saying half or 50%. three quarters (3/4) = .75, which multiplied by 100 equals 75%. Similarly 2/1 = 2 which multiplied by 100 equals 200% or twice an amount.</p>
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
