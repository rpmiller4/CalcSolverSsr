import React from 'react';
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div id="footer">
      <div className="row">
        <div className="col-sm" id="left">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
        </div>
        <div className="col-sm" id="middle">
        </div>
        <div className="col-sm" id="right">
        </div>
        <div className="col-sm" id="far-right">
          <ul>
            <li> </li>
            <li> </li>
            <li> </li>
            <li>Calc-Solver.com Copyright (c) 2021</li>
          </ul>
        </div>
      </div>
    </div>
  );
}