import React from 'react';
import Navigation from './Navigation';
import './App.scss';
import Home from './modules/Home';
import FreshmanWithTest from './modules/FreshmanWithTest';
import FreshmanTestOptional from './modules/FreshmanTestOptional';
import FreshmanNeedsBasedNJ from './modules/FreshmanNeedsBasedNJ';
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
      case "Freshman Merit With Test": return <FreshmanWithTest />;
      case "Freshman Merit Test Optional": return <FreshmanTestOptional />;
      case "Freshman Needs Based NJ Residents": return <FreshmanNeedsBasedNJ />;
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
        <Navigation handler={this.handleSelectModule} />
        {this.loadModule()}    
          
        
      </>
    );
  }
}