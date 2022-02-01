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
      <>
      <p>Select from the items below to begin editing data:</p>
      <select onChange={(e) => {props.handler(e)}}>
        {renderOptions(props.config)}
      </select>
      </>
  );
}