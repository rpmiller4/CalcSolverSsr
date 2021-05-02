import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export function About() {
  return (
    <div>
      <Helmet>
        <title>About Calc Solver - High Impact Calculators and Online Tools</title>
        <meta name='description' content='Just a couple of software developers writing calculators and high-impact tooling for various scenarios like automated text summarization and image analysis.' />
      </Helmet>
      <h1>About Calc Solver</h1>
      <p>Inspired by the convenience of sites like TimeAndDate.com we decided to create a site featuring calculators and high-impact tooling for various scenarios such as automated text summarization and image analysis.</p>
      <p>While some of the more advanced features are in the backburner, we are working fast to deliver practical calculators, converters, generators, and analyzers to meet needs in various niche ecologies.</p>
     </div>
  );
};
