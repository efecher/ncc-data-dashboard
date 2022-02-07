import React from 'react';
import './style/Navigation.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Navigation(props) {
  
  const renderOptions = (config) => {
    //console.log(config[0]);
    let options = [];

    for (let i=0; i < config.length; i++) {
      options.push(
        <option value={i} key={uuidv4()}>{config[i].matrixName}</option>
      );
    }
    return options;
  };
  
  return (
      <header>
        <p>Select from the items below to begin editing data:</p>
        <span id="chooser-wrapper">
          <select onChange={(e) => {props.handler(e)}}>
            {renderOptions(props.config)}
          </select>
        </span>
      </header>
  );
}