import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

export class WeightConverter extends Component {
  static displayName = WeightConverter.name;

  constructor(props) {
    super(props);
    this.state = { kg: 0, lbs: 0 };
    this.updateKg = this.updateKg.bind(this);
    this.updateLbs = this.updateLbs.bind(this);
  }

  updateKg(e) {
    var kgValue = e.target.value;
    var lbsValue = this.calculateLbsFromKg(kgValue);
    this.setState({ kg: kgValue, lbs: lbsValue });
  }
  
  updateLbs(e) {
    var lbsValue = e.target.value;
    var kgValue = this.calculateKgFromLbs(lbsValue);
    this.setState({ kg: kgValue, lbs: lbsValue });
  }

  calculateKgFromLbs(lbs) {
    return lbs * 0.45359237;
  }

  calculateLbsFromKg(kg) {
    return kg * 2.2046226218;
  }

  renderLeft() {
    return (
      <div>
        <h1>Weight Converter</h1>
        <h2>Convert Between Kilograms and Pounds</h2>
        <TextControl prepend="Kilograms" type="number" value={this.state.kg} append="kg" onChange={this.updateKg} />
        <TextControl prepend="Pounds" type="number" value={this.state.lbs} append="lbs" onChange={this.updateLbs} />
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Weight Calculator</title>
          <meta name='description' content='Convert between Kilograms (kg) and Pounds (lbs) easily.' />
        </Helmet>
        <h3>Convert between Kilograms and Pounds</h3>
        <p>A pound is an imperial unit of mass equivalent to exactly 0.45359237 kilograms. To convert from kilograms to pounds the kilogram units can be multiplied by 2.2046226218.</p>
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
