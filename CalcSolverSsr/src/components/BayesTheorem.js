import React, { Component } from 'react';
import { ThreeColumnContainer } from "./Layout/ThreeColumnContainer";
import { Helmet } from "react-helmet";
import { TextControl } from "./controls/Input";

export class BayesTheorem extends Component {
  static displayName = BayesTheorem.name;

  constructor(props) {
    super(props);
    this.state = { pA: 0, pB: 0, pBGivenA: 0, pAGivenB: 0 };
    this.updatePA = this.updatePA.bind(this);
    this.updatePB = this.updatePB.bind(this);
    this.updatePBGivenA = this.updatePBGivenA.bind(this);
    this.calculatePAGivenB = this.calculatePAGivenB.bind(this);
  }

  updatePA(e) {
    this.setState({ pA: e.target.value }, () => this.calculatePAGivenB());
  }

  updatePB(e) {
    this.setState({ pB: e.target.value }, () => this.calculatePAGivenB());
  }
  
  updatePBGivenA(e) {
    this.setState({ pBGivenA: e.target.value }, () => this.calculatePAGivenB());
  }

  calculatePAGivenB() {
    this.setState({
      pAGivenB: ((this.state.pBGivenA / 100) * (this.state.pA / 100)) / (this.state.pB / 100) * 100
    });
  }

  renderLeft() {
    return (
      <div>
        <h1>Bayes Theorem Calculator</h1>
        <h2>Calculate the probability of P(A|B)</h2>
        <TextControl prepend="P(A)" type="number" value={this.state.pA} onChange={this.updatePA}/>
        <TextControl prepend="P(B)" type="number" value={this.state.pB} onChange={this.updatePB}/>
        <TextControl prepend="P(B|A)" type="number" value={this.state.pBGivenA} onChange={this.updatePB}/>
        <h2>P(A|B):{this.state.pAGivenB}%</h2>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Bayes Theorem Calculator</title>
          <meta name='description' content='Calculate conditional probability using Bayes Theorem.' />
        </Helmet>
        <h3>Calculate the probability of P(A|B)</h3>
        <p>Calculate the probability P(A|B) based on P(B), P(A), and P(B|A). The notation P(A) means "the probability of A" and the notation P(A|B) translates to "the probability of A given B". In clearer language, this is the probability of an event A happening based on B also being true.</p>
        <p>Bayes' Theorem deals with conditional probability. Specifically, what is the probability of one event knowing that another potentially related event has been observed.</p>
        <h4>Applications</h4>
        <p>Medical diagnoses, Weather forecasting, spam filtering.</p>
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
