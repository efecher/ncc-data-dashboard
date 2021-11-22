import React, { useState, useEffect } from "react";
import '../App.scss';
import Navigation from '../Navigation';

export default function FreshmanNeedsBased() {
  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10 content-area">
          <p>Freshman Needs Based Matrix</p>
        </div>
      </div>
    </div>
  );
}