import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { stringToNumeric } from '../utils/utils';
import '../style/Matrix.scss';

export default function Matrix(props) {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  // NOTE: set saved state of this dashboard
  const [saved, setSaved] = useState(true);

  // NOTE: save column names for re-use
  const columnNames = props.config.columns;

  //console.log(props.config.urls.get);
  // NOTE: this URL should match the real environment so we don't need to change anything for a "live" build
  const getURL = props.config.urls.get;
  const postURL = props.config.urls.post;

  // NOTE: we want the data fetch to be synchronous because we can't really do anything until we have it, we don't want a default table to load with no data and then "flash" to one containing the data when it loads. Reference: https://stackoverflow.com/questions/55008076/react-useeffect-hook-and-async-await-own-fetch-data-func
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if(response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving the data");
      }
    } catch (error) {
      console.log("The Data doesn't exist on the server or there is an error attempting to retrieve it.");
      // NOTE: assume the server data doesn't exist as in we are creating a brand new matrix.

    }
  };
  
  useEffect(() => {
    fetchData(getURL)
    .then(json => {
      //console.log(json);
      let matrix = [];
      if(typeof json !== 'undefined') {
        // NOTE: capture the entire matrix in a variable for easier manipulation
        let mData = json.data;
        // NOTE: cycle through the rows and get data by row
        for(let row=0; row<mData.length; row++) {
          // NOTE: this should be our current row in the matrix
          let rData = mData[row];
          //console.log(rData);
          let r = {};
          for(let col=0; col<props.config.columns.length; col++) {
            r[`${columnNames[col].stateVariableName}`] = rData[col].toString();
          }
          matrix.push(r);
        }
        //console.log(matrix);
      } else {
        // NOTE: there isn't any existing data, we're creating a new file
        // NOTE: default matrix
        let r = {};
        for(let col=0; col<props.config.columns.length; col++) {
          r[`${columnNames[col].stateVariableName}`] = "";
        }
        matrix.push(r);
      }
      //console.log(matrix);
      setInputList(matrix);
    })
    .catch(error => {
      console.error(error);
    })
  }, [getURL, props.config.columns, columnNames]);
    
  // handle clear button
  // TODO: fix 
  const handleClear = () => {
    let r = {};
    
    //console.log(columnNames);
    for(let col=0; col<columnNames.length; col++) {
      console.log(columnNames[col].stateVariableName);
    }
    //console.dir(r);
    setInputList(r);
    return;
  }
  
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setSaved(false);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    let r = {};

    for(let col=0; col<columnNames.length; col++) {
      r[`${columnNames[col].stateVariableName}`] = "";
    }
    //console.log(r);
    setInputList([...inputList, r]);
    setSaved(false);
  };

  // NOTE: convert table data from state to numeric matrix for output
  const convertInputData = (data) => { 
    let matrix = [];
    for(let r=0; r<data.length; r++) {
      let rData = data[r];
      let cols = Object.keys(rData);
      //console.log(cols);
      let convertedRow = [];
      for(let c=0; c<cols.length; c++) {
        //console.log(rData[`${cols[c]}`]);
        convertedRow.push(stringToNumeric(rData[`${cols[c]}`]));
      }
      matrix.push(convertedRow);
    }  
    return matrix;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log((convertInputData(inputList)));
    fetch(postURL, {
      accepts: 'application/json, plain/text',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({data: convertInputData(inputList)})
    })
    .then(() => {
      setSaved(true);
    })
    .catch(res => console.log(res));
    setSaved(true);
    return true;
  };
  
  // handle input change
  const handleInputChange = (e, row, name) => {
    console.log(e.target);
    console.log(row);
    console.log(name);
    const list = [...inputList];
    //console.log(list[row]);
    list[row][`${name}`] = e.target.value;
    //console.log(list[row][`${name}`]);
    setInputList(list);
    return true;
  };

  return (
    (inputList !== null)? 
      <>
      <div id="main">
        <h3>{props.config.matrixName} {saved ? null : <span style={{fontWeight: "bold", color: "red"}}>*</span>}</h3>
      </div> 
      <form onSubmit={handleSubmit}>
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col md-12">
              <table className="table" summary={props.config.matrixName}>
                <thead>
                <tr>
                  {
                    props.config.columns.map((c) => {
                      return <th key={uuidv4()}>{c.columnName}</th>
                    })
                  }
                  <th className="remove-button-column">Remove Row</th>
                </tr>
                </thead>
                <tbody>
                  { 
                    inputList.map((r, j) => {
                      //console.log(j);
                      return ( 
                        <tr key={j}>
                          {
                            Object.keys(r).map((c, i) => { 
                              //console.log(inputList[j][c]);
                              //console.log(c);
                              //console.log(r[c]);
                              return (
                                <td key={`${c.stateVariableName}-${i}`} >
                                  <input 
                                    name={c}
                                    placeholder="0"
                                    value={inputList[j][c]}
                                    onChange={e => handleInputChange(e,j,c)}
                                  />
                                </td>
                              )
                            })
                          }
                          <td className="remove-button-column">
                            {
                              inputList.length > 1 &&  
                              <button 
                                className="btn btn-danger"
                                onClick={()=>handleRemoveClick(j)}
                              >
                                &times;
                              </button>
                            }
                          </td>
                        </tr>
                        
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row g-0 ">
          <div className="action-buttons col-md-1">
            <button type="button" className="btn btn-success" onClick={()=>{handleAddClick()}}>Add Row</button>
          </div>
          <div className="action-buttons col-md-1">
            <button type="button" className="btn btn-info" onClick={()=>{handleClear()}}>Clear Matrix</button>
          </div>
          <div className="action-buttons col-md-1">
            <input type="submit" className="btn btn-primary" value="Submit Matrix" />
          </div>
        </div> 
      </form>
      </>
     : <p>Loading data...</p>
  );
}
