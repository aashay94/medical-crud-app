import { Component } from 'react';
import './App.css';
import PatientDetails from './PatientDetails';

class App extends Component {
  render() {    
    return (    
      <div className="content">    
        <PatientDetails />    
      </div >    
    );    
  }
}   

export default App;
