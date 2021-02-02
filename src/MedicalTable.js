import React from "react";
import Autocomplete from "./Autocomplete";
import './Autocomplete.css';
function MedicalTable(props) {
  return (
    <div className="layout-column align-items-center mt-50">
        <h3 style={{color: '#1E90FF'}}>Medical Scan Details</ h3>  
        <hr style={{border: '0.5px solid #1E90FF'}}></hr>  
        <label htmlFor="scanList">Scan List</label>
        <Autocomplete suggestions={["CT BRAIN", "CT PNS", "MRI BRAIN", "MRI PNS", "GLUCOSE FASTING", "SUGAR TESTING"]} data={props.medical}/>
    </div>
  );
}

export default MedicalTable;