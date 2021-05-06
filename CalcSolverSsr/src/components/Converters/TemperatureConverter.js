import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import { TextControl } from "../controls/Input";
import { Helmet } from "react-helmet";

export class TemperatureConverter extends Component {
  static displayName = TemperatureConverter.name;

  constructor(props) {
    super(props);
    this.state = { celsius: 0, fahrenheit: 32 };
    this.updateCelsius = this.updateCelsius.bind(this);
    this.updateFahrenheit = this.updateFahrenheit.bind(this);
  }

  updateCelsius(e) {
    var celsiusValue = e.target.value;
    var fahrenheitValue = this.calculateFahrenheitFromCelsius(celsiusValue);
    this.setState({ celsius: celsiusValue, fahrenheit: fahrenheitValue });
  }
  
  updateFahrenheit(e) {
    var fahrenheitValue = e.target.value;
    var celsiusValue = this.calculateCelsiusFromFahrenheit(fahrenheitValue);
    this.setState({ celsius: celsiusValue, fahrenheit: fahrenheitValue });
  }

  calculateFahrenheitFromCelsius(celsius) {
    return celsius * (9 / 5) + 32;
  }

  calculateCelsiusFromFahrenheit(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  renderLeft() {
    return (
      <div>
        <h1>Temperature Converter</h1>
        <h2>Convert Between Temperatures</h2>
        <TextControl prepend="Celsius" type="number" value={this.state.celsius} append={<span>&deg;C</span>} onChange={this.updateCelsius} />
        <TextControl prepend="Fahrenheit" type="number" value={this.state.fahrenheit} append={<span>&deg;F</span>} onChange={this.updateFahrenheit} />
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Temperature Converter - Fahrenheit To Celsius</title>
          <meta name='description' content='Convert between Fahrenheit And Celsius easily.' />
        </Helmet>
        <h3>Convert between Celsius and Fahrenheit</h3>
        <p>32 degrees Fahreneheit is defined as the freezing point of water and is equivalent to 0 degrees Celsius. 212 degrees Fahrenheit is defined as the temperature at which water boils and is equivalent to 100 degrees Celsius.</p>
        <p>The Celsius scale is used around the world. However, Fahrenheit is preferred in the United States, the Bahamas, Belize, Cayman Islands and Palau.</p>
        <p>Adults have a low-grade fever at 100.4&deg;F or 38&deg;C. A temperature of 103&deg;F or 39.4&deg;C is considered a high-grade fever in adults.</p>
        <p>Temperate climates per the Köppen climate classification range between a mean temperature of −3 °C or 26.6 °F but below 18 °C or 64.4 °F.</p>
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
