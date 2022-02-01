import React from 'react';
import Navigation from './Navigation';
import './style/App.scss';
//import Home from './modules/Home';
import Matrix from './modules/Matrix';
// import FreshmanWithTest from './modules/FreshmanWithTest';
// import FreshmanTestOptional from './modules/FreshmanTestOptional';
// import FreshmanNeedsBasedNJ from './modules/FreshmanNeedsBasedNJ';
// import FreshmanNeedsBasedNonNJ from './modules/FreshmanNeedsBasedNonNJ';
// import TransferNeedsBasedNJ from './modules/TransferNeedsBasedNJ';
// import TransferNeedsBasedNonNJ from './modules/TransferNeedsBasedNonNJ';
// import TransferMeritBased from './modules/TransferMeritBased';
// import Pell from './modules/Pell';
// import TuitionAssistanceGrant from './modules/TuitionAssistanceGrant';
// import EFCDependent from './modules/EFCDependent';
// import EFCIndependentNoDependents from './modules/EFCIndependentNoDependents';
// import EFCIndependentWithDependents from './modules/EFCIndependentWithDependents';
// import Tuition from './modules/Tuition';

import { config } from './config/matrices.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentModule: 0,
      config: config
    }
  }

  loadModule = () => {
    //console.log(this.state.currentModule);
    // NOTE: find the corresponding Matrix config for the currentModule
    for(let i=0; i<config.length; i++) {
      if(i === this.state.currentModule) {
        return <Matrix config={this.state.config[i]} />;
      }
    }
  }

  handleSelectModule = (e) => {
    this.setState({
      currentModule: e.target.value
    });
  }


  render() {
    return (
      <>
        <div className="row g-0">
          <nav className="col-2">
            <div className="title-contain">
              <h3>Net Cost Calculator</h3>
              <h4>Data Management</h4>
            </div>
            <Navigation handler={this.handleSelectModule} config={this.state.config} />
          </nav>
          <div className="col-10">
            {this.loadModule()} 
          </div>  
        </div>
      </>
    );
  }
}