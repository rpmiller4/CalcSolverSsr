import React from 'react';

export function TextControl(props) {
  return (
    <div className="input-group">
      {props.prepend &&
      <div className="input-group-prepend">
        <span className="input-group-text">{props.prepend}</span>
      </div> }
      <input className="form-control" type={props.type} value={props.value} onChange={props.onChange} />
      {props.append &&
      <div className="input-group-append">
        <span className="input-group-text">{props.append}</span>
        </div>
      }
    </div>
  );
}