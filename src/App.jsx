import React, {useState} from 'react';
import Navigation from './Navigation';
import './App.scss';
import FreshmanWithTest from './modules/FreshmanWithTest';
import FreshmanTestOptional from './modules/FreshmanTestOptional';
import FreshmanNeedsBasedNJ from './modules/FreshmanNeedsBasedNJ';
import FreshmanNeedsBasedNonNJ from './modules/FreshmanNeedsBasedNonNJ';
import TransferNeedsBasedNJ from './modules/TransferNeedsBasedNJ';
import TransferNeedsBasedNonNJ from './modules/TransferNeedsBasedNonNJ';
import TransferMeritBased from './modules/TransferMeritBased';
import Pell from './modules/Pell';
import TuitionAssistanceGrant from './modules/TuitionAssistanceGrant';
import EFCDependent from './modules/EFCDependent';
import EFCIndependentNoDependents from './modules/EFCIndependentNoDependents';
import EFCIndependentWithDependents from './modules/EFCIndependentWithDependents';
import Tuition from './modules/Tuition';

export default function App() {
  const [currentModule, setCurrentModule] = useState("Home");
  
  const selectBoxChangeHandler = (e) => {
    //console.log(e.target.value);
    setCurrentModule(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-12">
          <h2>Net Cost Calculator - Application Data Management</h2>
          <p className="text-center">Select from the data categories to edit values</p>
          <div className="row g-0">
            <div className="col-2 offset-md-5">
              <Navigation handler={selectBoxChangeHandler} />
            </div>
          </div>
        </div>
       
        <div className="col-10">
          
        </div>
      </div>
    </div>
  )
}