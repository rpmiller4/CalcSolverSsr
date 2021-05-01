import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Calc-Solver.com</h1>
        <p>This site contains various tools that we've found useful.</p>
        <ul>
          <li>Calculators</li>
          <li>Converters</li>
          <li>Generators</li>
          <li>Analyzers</li>
        </ul>
        <p>The updated list of utilities is the following</p>

        <ul>
          <li>
            <Link to="/body-mass-index-calculator">BMI calculator</Link>
          </li>
          <li>
            <Link to="/bayes-theorem-calculator">Bayes' Theorem calculator</Link>
          </li>
          <li>
            <Link to="/percentage-calculator">Percentage Calculator</Link>
          </li>
          <li>
            <Link to="/random-number-generator">Random Number Generator</Link>
          </li>
          <li>
            <Link to="/strong-password-generator">Strong Password Calculator</Link>
          </li>
          <li>
            <Link to="/document-analyzer">Document Analyzer</Link>
          </li>
          <li>
            <Link to="/image-analyzer">Image Analyzer</Link>
          </li>
          <li>
            <Link to="/temperature-converter">Temperature Converter</Link>
          </li>
          <li>
            <Link to="/date-difference-calculator">Date Difference Calculator</Link>
          </li>
        </ul>
      </div>
    );
  }
}