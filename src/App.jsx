import React from 'react';
import Navigation from './Navigation';
import './App.scss';

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10 content-area">
          <h1>Net Cost Calculator</h1>
          <h2>Data Entry Dashboard</h2>
          <p>
            Select from the modules to the left to
            load and edit data used by the 
            Net Cost Calculator to perform calculations.<br />
            Modules should load with the existing data and allow
            for editing and saving.
          </p>
        </div>
      </div>
    </div>
  )
}