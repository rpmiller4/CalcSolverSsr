import React, { Component  } from 'react';
import { ThreeColumnContainer } from "../Layout/ThreeColumnContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from 'react-helmet';

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export class DateDifference extends Component {
  static displayName = DateDifference.name;

  constructor(props) {
    super(props);
    this.state = { startDate: new Date(), endDate: new Date(), differenceInDays : 0 }
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
  }

  updateStartDate(date) {
    this.setState({ startDate: date }, () => this.updateDifferenceInDays());
  }

  updateEndDate(date) {
    this.setState({ endDate: date }, () => this.updateDifferenceInDays());
  }

  updateDifferenceInDays() {
    this.setState({ differenceInDays: this.dateDiffInDays(this.state.startDate, this.state.endDate) });
  }

  renderLeft() {
    return (
      <div>
        <h1>Date Difference Calculator</h1>
        <h2>Get the difference between two dates</h2>
        <DatePicker selected={this.state.startDate} onChange={(date) => this.updateStartDate(date)} />
        <p></p>
        <DatePicker selected={this.state.endDate} onChange={(date) => this.updateEndDate(date)} />
        <h2>{this.state.differenceInDays} days</h2>
      </div >
    );
  }

  renderMiddle() {
    return (
      <div>
        <Helmet>
          <title>Date Difference Calculator</title>
          <meta name='description' content='Calculate the number of days between two calendar dates.' />
        </Helmet>
        <h3>Calculate the number of days between two calendar dates.</h3>
        <p></p>
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

  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  // a and b are javascript Date objects
  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
