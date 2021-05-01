import React from 'react';

const designsThatWillAwe = require("../../images/WebsiteDesignsThatWillAwe.png");

export function ThreeColumnContainer(props) {
  return (
    <div className="row">
      <div className="col-6" id="left">
        {props.left}
      </div>
      <div className="col-sm" id="middle">
        {props.middle}
      </div>
      <div className="col-sm" id="right">
        <img src={designsThatWillAwe} alt="Fractal Flame Swirls - Designs That Will Awe"/>
      </div>
    </div>
  );
}