import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
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
          let _row = {};
          for(let col=0; col<rData.length; col++) {
            // NOTE: now at the individual column per row
            _row[`${columnNames[col].stateVariableName}`] = rData[col];
          }
          matrix.push(_row);
        }

      } else {
        // NOTE: there isn't any existing data, we're creating a new file
        // NOTE: default matrix
        let r = {};
        for(let col=0; col<props.config.columns.length; col++) {
          r[`${columnNames[col].stateVariableName}`] = "0";
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
  const handleClear = () => {
    let r = {};
    let _inputList = [];

    for(let col=0; col<columnNames.length; col++) {
      r[`${columnNames[col]}`] = "0";
    }

    _inputList.push(r);

    setInputList(_inputList);
    return;
  }
  
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setSaved(false);
  };
  
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
      r[`${columnNames[col]}`] = "0";
    }

    setInputList([...inputList, r]);
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    //console.log(JSON.stringify(convertInputData(inputList)));
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
    return;
  };

  // NOTE: convert string data from inputs to floats or integers as needed
  const convertInputData = (data) => {
    //console.log(data);
    let output = [];
    for(let i=0; i<data.length; i++) {
      // NOTE: get the row data
      let row = data[i];
      let convertedRow = {};
      console.log(row);
      for(let col=0; col<row.length; col++) {
        // NOTE: pull out individual values in the row for conversion
        if(isNaN(parseFloat(row[col]))) {
          convertedRow[columnNames.stateVariableName] = parseInt(data[i][columnNames.stateVariableName]);
        } else {
          convertedRow[columnNames.stateVariableName] = parseFloat(data[i][columnNames.stateVariableName]);
        }
      }
      output.push(convertedRow);
    }

    return output;
  }
    

  return (
    <>
    <header>
      <h3>{props.config.matrixName} {saved ? null : <span style={{fontWeight: "bold", color: "red"}}>*</span>}</h3>
    </header> 
    <form onSubmit={handleSubmit}>
      <div className="matrix-area">
        <div className="row g-0">
          <div className="col md-12">
            <table className="matrix" summary="Freshman Merit Based matrix with GPA, SAT/ACT scores.">
              <thead>
              <tr>
                {
                  props.config.columns.map((c) => {
                    return <th key={uuidv4()}>{c.columnName}</th>
                  })
                }
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
                <tr><td>Loading Matrix...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row g-0">
        <div className="action-buttons col md-2 offset-md-5">
          <button type="button" className="btn btn-info" onClick={()=>{handleClear()}}>Clear Matrix</button>
          <input type="submit" className="btn btn-primary" value="Submit Matrix" />
        </div>
      </div> 
    </form>
    </>
  );
}
