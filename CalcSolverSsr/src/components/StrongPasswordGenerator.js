import React, { Component } from 'react';
import { ThreeColumnContainer } from "./Layout/ThreeColumnContainer";
import { Helmet } from 'react-helmet';

export class StrongPasswordGenerator extends Component {
  static displayName = StrongPasswordGenerator.name;

  constructor(props) {
    super(props);
    this.state = { generatedPassword: "" };
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword() {
    var maxCharacters = 16;
    var characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz!@#$%^&*-_=+:~1234567890";
    var minCharacter = 0;
    var maxCharacter = characterSet.length;
    var resultingPassword = "";
    for (var i = 0; i < maxCharacters; i++) {
      var generatedNumber = Math.floor(Math.random() * (maxCharacter - minCharacter)) + minCharacter;
      resultingPassword += characterSet[generatedNumber];
    }
    this.setState({ generatedPassword: resultingPassword });
  }

  renderLeft() {
    return (
      <div>
        <Helmet>
          <title>Strong Password Generator</title>
          <meta name='description' content='Generate Strong Passwords' />
        </Helmet>
        <h1>Strong Password Generator</h1>
        <button className="btn btn-outline-primary" onClick={() => this.generatePassword()}>Generate Password</button>
        <h2>{this.state.generatedPassword}</h2>
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <h3>Generate strong passwords</h3>
        <p>Long passwords with random alphanumeric characters, especially those using uncommon punctuation characters are less likely to be guessed by an attacker.</p>
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
