import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";

export class DocumentAnalyzer extends Component {
  static displayName = DocumentAnalyzer.name;

  constructor(props) {
    super(props);
    this.state = { characterCount: 0, wordCount: 0, text: "" };

    this.updateText = this.updateText.bind(this);
    this.countCharacters = this.countCharacters.bind(this);
    this.updateNSentences = this.updateNSentences.bind(this);
    this.countCharacters = this.countCharacters.bind(this);
  }

  updateText(e) {
    this.setState({ text: e.target.value },
      () => {
        this.countCharacters();
        this.countWords();
      });
  }

  updateNSentences(e) {
    this.setState({ nSentences: e.target.value });
  }

  countCharacters() {
    var regex = /\w| /g; //word characters and spaces only.
    var results = String(this.state.text).match(regex);
    if (results == null) {
      this.setState({ characterCount: 0 });
    } else {
      this.setState({ characterCount: results.length });
    }
  }

  countWords() {
    var regex = /\w+/g;
    var results = String(this.state.text).match(regex);
    if (results == null) {
      this.setState({ wordCount: 0 });
    } else {
      this.setState({ wordCount: results.length });
    }
  }

  renderLeft() {
    return (
      <div>
        <h1>Document Analyzer</h1>
        <h4>Character Count: {this.state.characterCount}</h4>
        <h4>Word Count: {this.state.wordCount}</h4>
        <textarea className="form-control" value={this.state.text} rows="10" onChange={this.updateText} />
      </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Word and Character Count Calculator</title>
          <meta name='description' content='Copy and Paste any text document to get the number of words and characters.' />
        </Helmet>
        <h3>Analyze Documents</h3>
        <h4>Features</h4>
        <p>Copy and paste into the textarea to the left to get character counts, word counts. Character count limits come up on Twitter and text messages where the character count limits are 280 and 160 characters respectively.</p>
        <p>Word counts get used by translators, who charge by the word; and pervasively through academia. Essays in U.S. middle schools sometimes have a minimum requirement of 500 words. A short story is between 20-7500 words and a novel is 40,000 words or more.</p>
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
