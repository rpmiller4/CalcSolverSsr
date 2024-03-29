import React, { Component } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import EXIF from 'exif-js';
import { Helmet } from "react-helmet";
const blankImage = require("../../images/blank.jpg");


export class ImageAnalyzer extends Component {
  static displayName = ImageAnalyzer.name;

  constructor(props) {
    super(props);
    this.state = { imgUrl: "", allMetaData: "" };
    this.getExif = this.getExif.bind(this);
    this.listenForFileUpload = this.listenForFileUpload.bind(this);
    this.listenForFileUpload();
  }

  listenForFileUpload() {
    window.addEventListener('load', function () {
      document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
          var img = document.querySelector('img');
          img.onload = () => {
            //URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
      });
    });
  }

  getExif() {
    var img2 = document.getElementById("myImg");
    EXIF.getData(img2, function () {
      var allTheMetaData = EXIF.getAllTags(this);
      var allMetaDataSpan = document.getElementById("allMetaDataSpan");
      allMetaDataSpan.innerHTML = JSON.stringify(allTheMetaData);
      console.dir(allTheMetaData);
    });
  }    

  renderLeft() {
    return (
      <div>
        <h1>Document Analyzer</h1>

        <form>
          <div className="form-group">
            <label for="exampleFormControlFile1">Example file input</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1"></input>
          </div>
        </form>
        <br /><img alt="placeholder to analyze" id="myImg" src={blankImage} width="400"></img>
        <button className="btn btn-secondary" onClick={() => this.getExif()}>Get Image MetaData</button>
        <textarea id="allMetaDataSpan" className="form-control">{this.state.allMetaData}</textarea>
        <span id="allMetaDataSpan"></span>
     </div>
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Image Analyzer</title>
          <meta name='description' content='Extract Exif Data and other data from any image.' />
        </Helmet>
        <h3>Analyze Images</h3>
        <h4>Features</h4>
        <p>Select an image to get a readout of its Exif Data. Exif data might include geotagging - where a picture was taken, as well as focal length, whether flash was triggered and other image metadata.</p>
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
