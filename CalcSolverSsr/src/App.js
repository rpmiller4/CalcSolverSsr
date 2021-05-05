import './custom.css'
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import BodyMassIndex from './components/BodyMassIndex';
import { Percentage } from './components/Percentage';
import { BayesTheorem } from './components/BayesTheorem';
import { RandomNumberGenerator } from './components/RandomNumberGenerator';
import { DocumentAnalyzer } from './components/Analyzers/DocumentAnalyzer';
import { ImageAnalyzer } from './components/Analyzers/ImageAnalyzer';
import { StrongPasswordGenerator } from './components/StrongPasswordGenerator';
import { TemperatureConverter } from './components/Converters/TemperatureConverter';
import { DateDifference } from './components/DateCalculators/DateDifference';
import { WeightConverter } from './components/Converters/WeightConverter';
import { ArithmeticMean } from './components/Statistics/ArithmeticMean';
import { About } from './pages/About';
import { StandardDeviation } from './components/Statistics/StandardDeviation';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/body-mass-index-calculator'><BodyMassIndex /></Route>
        <Route path='/percentage-calculator' component={Percentage} />
        <Route path='/bayes-theorem-calculator' component={BayesTheorem} />
        <Route path='/random-number-generator' component={RandomNumberGenerator} />
        <Route path='/document-analyzer' component={DocumentAnalyzer} />
        <Route path='/strong-password-generator' component={StrongPasswordGenerator} />
        <Route path='/image-analyzer' component={ImageAnalyzer} />
        <Route path='/temperature-converter' component={TemperatureConverter} />
        <Route path='/date-difference-calculator' component={DateDifference} />
        <Route path='/weight-converter' component={WeightConverter} />
        <Route path='/arithmetic-mean-calculator' component={ArithmeticMean} />
        <Route path='/population-standard-deviation-calculator' component={StandardDeviation} />
        <Route path='/about' component={About} />
      </Layout>
    );
  }
}
