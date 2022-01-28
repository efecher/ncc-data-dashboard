import React from 'react';


export default function Navigation(props) {
  return (
      <select onChange={(e) => {props.handler(e)}}>
        <option value="Home">Home</option>
        <option value="Freshman Merit With Test">Freshman Merit With Test</option>
        <option value="Freshman Merit Test Optional">Freshman Merit (Test Optional)</option>
        <option value="Freshman Needs Based NJ Residents">Freshman Needs Based NJ Residents</option>
        <option value="Freshman Needs Based Non-NJ Residents">Freshman Needs Based: Non-NJ Residents</option>
        <option value="Transfer Needs Based NJ Residents">Transfer: Needs Based (NJ Residents)</option>
        <option value="Transfer Needs Based Non NJ Residents">Transfer: Needs Based (Non NJ Residents)</option>
        <option value="Transfer Merit-Based GPA">Transfer: Merit-Based (GPA)</option>
        <option value="Pell">Pell</option>
        <option value="Tuition Assistance Grant">Tuition Assistance Grant</option>
        <option value="EFC Dependent">EFC - Dependent</option>
        <option value="EFC Independent with no dependents">EFC - Independent with no Dependents</option>
        <option value="EFC Independent with Dependents">EFC - Independent with Dependents</option>
        <option value="SHU Tuition and Expenses">SHU Tuition and Expenses</option>
      </select>
  );
}