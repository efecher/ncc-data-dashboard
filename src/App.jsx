import React from 'react';
import Navigation from './Navigation';
import './style/App.scss';
import Home from './modules/Home';
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentModule: "Home"
    }
  }

  loadModule = () => {
    console.log(this.state.currentModule);
    switch(this.state.currentModule) {
      case "Freshman Merit With Test": return <Matrix />;
      default: return <Home />;
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
            <Navigation handler={this.handleSelectModule} />
          </nav>
          <div className="col-10">
            {this.loadModule()} 
          </div>  
        </div>
      </>
    );
  }
}