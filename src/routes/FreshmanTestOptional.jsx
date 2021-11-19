import React from 'react';
import Navigation from '../Navigation';
import '../App.scss';

function FreshmanTestOptional() {
  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10 content-area">
          <p>Test Optional Matrix editor will load here</p>
        </div>
      </div>
    </div> 
  );
}

export default FreshmanTestOptional;