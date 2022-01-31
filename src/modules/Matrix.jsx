import React, { useState, useEffect } from "react";
import '../style/Matrix.scss';

export default function Matrix(props) {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  // NOTE: set saved state of this dashboard
  const [saved, setSaved] = useState(true);

  // NOTE: this URL should match the real environment so we don't need to change anything for a "live" build
  const getURL = "/rest/data/costcalculator/get/freshmanmeritwithtest";
  const postURL = "/rest/data/costcalculator/post/freshmanwithtest";

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
      console.log(json);
      let matrix = [];
      if(typeof json !== 'undefined') {
        // NOTE: cycle through and populate the existing data
        for(let row of json.data) {
          let r = {
            gpaRangeLower: row[0],
            gpaRangeUpper: row[1],
            satRangeLower: row[2],
            satRangeUpper: row[3],
            actRangeLower: row[4],
            actRangeUpper: row[5],
            awardAmount: row[6],
            placeholder: "0"
          }
          matrix.push(r);
        }
      } else {
        // NOTE: there isn't any existing data, we're creating a new file
        matrix.push({
          gpaRangeLower: 0,
            gpaRangeUpper: 0,
            satRangeLower: 0,
            satRangeUpper: 0,
            actRangeLower: 0,
            actRangeUpper: 0,
            awardAmount: 0,
            placeholder: "0"
        });
      }
      setInputList(matrix);
    })
    .catch(error => {
      console.error(error);
    })
  }, []);
    
  // handle clear button
  const handleClear = () => {
    setInputList([{
      gpaRangeLower: "0",
      gpaRangeUpper: "0",
      satRangeLower: "0",
      satRangeUpper: "0",
      actRangeLower: "0",
      actRangeUpper: "0",
      awardAmount: "0",
      placeholder: "0"
    }]);
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
    setInputList([...inputList, { gpaRangeLower: "", gpaRangeUpper: "", satRangeLower: "", satRangeUpper: "", actRangeLower: "", actRangeUpper: "", awardAmount: "" }]);
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

  const convertInputData = (data) => {
    //console.log(data);
    let output = [];
    for(let i=0; i<data.length; i++) {
      let row = [];

      row.push(
        // NOTE: Check if input is a number first before converting from string, empty strings, as in the initial values of the inputs are NaN
        (data[i].gpaRangeLower === "")? 0 : parseFloat(data[i].gpaRangeLower), 
        (data[i].gpaRangeUpper === "")? 0 : parseFloat(data[i].gpaRangeUpper), 
        (data[i].satRangeLower === "")? 0 : parseInt(data[i].satRangeLower), 
        (data[i].satRangeUpper === "")? 0 : parseInt(data[i].satRangeUpper), 
        (data[i].actRangeLower === "")? 0 : parseInt(data[i].actRangeLower), 
        (data[i].actRangeUpper === "")? 0 : parseInt(data[i].actRangeUpper), 
        (data[i].awardAmount === "")? 0 : parseInt(data[i].awardAmount)
      );
      output.push(row);
    }

    return output;
  }

  console.log(saved);
  return (
    <>
    <header>
      <h3>Freshman Merit Based - Matrix With Test Scores {saved ? null : <span style={{fontWeight: "bold", color: "red"}}>*</span>}</h3>
    </header> 
    <form onSubmit={handleSubmit}>
      <div className="matrix-area">
        <div className="row g-0">
          <div className="col md-12">
            <table className="matrix" summary="Freshman Merit Based matrix with GPA, SAT/ACT scores.">
              <thead>
              <tr>
                <th>GPA Range Lower Bound</th>
                <th >GPA Range Upper Bound</th>
                <th>SAT Range Lower Bound</th>
                <th>SAT Range Upper Bound</th>
                <th>ACT Range Lower Bound</th>
                <th>ACT Range Upper Bound</th>
                <th>Award Amount</th>
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody>
                {
                  (inputList !== null)? inputList.map((x, i) => {
                  return (
                    <React.Fragment key={`table-input-${i}`}>
                    <tr>
                      <td className="text-center">
                        <input
                          name="gpaRangeLower"
                          placeholder="0"
                          value={x.gpaRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="gpaRangeUpper"
                          placeholder="0"
                          value={x.gpaRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="satRangeLower"
                          placeholder="0"
                          value={x.satRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="satRangeUpper"
                          placeholder="0"
                          value={x.satRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="actRangeLower"
                          placeholder="0"
                          value={x.actRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="actRangeUpper"
                          placeholder="0"
                          value={x.actRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="awardAmount"
                          placeholder="0"
                          value={x.awardAmount}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                    <td className="text-center">
                      {inputList.length !== 1 && <button
                        className="button"
                        onClick={() => handleRemoveClick(i)}>Remove Row</button>}
                    </td>
                  </tr>
                  <tr>
                    <td className="add-row-button" colSpan="8">{inputList.length - 1 === i && <button className="button" onClick={handleAddClick}>Add Row</button>}</td>
                  </tr>
                  </React.Fragment>
                );
              }): <tr><td>Loading Matrix...</td></tr>}
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
