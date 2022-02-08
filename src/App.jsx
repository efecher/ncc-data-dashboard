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
import { stringToNumeric } from './utils/utils';
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
      currentModule: stringToNumeric(e.target.value)
    });
  }


  render() {
    return (
      <>
        <div className="row g-0">
          <nav className="col-12">
            <div className="title-contain">
              <h3>Net Cost Calculator Data Management Console</h3>
            </div>
            <Navigation handler={this.handleSelectModule} config={this.state.config} currentModule={this.state.currentModule} />
          </nav>
        </div>
        <div className="row g-0">
          <div className="col-12">
            {this.loadModule()} 
          </div>  
        </div>
      </>
    );
  }
}