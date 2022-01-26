import React, { useState, useEffect } from "react";
import '../App.scss';

export default function FreshmanWithTest() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  // NOTE: set saved state of this dashboard
  const [saved, setSaved] = useState(false);

  const getURL = "https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/get/freshmanwithtest";

  const postURL = "https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/post/freshmanwithtest";

  // NOTE: we want the data fetch to be synchronous because we can't really do anything until we have it, we don't want a default table to load with no data and then "flash" to one containing the data when it loads. Reference: https://stackoverflow.com/questions/55008076/react-useeffect-hook-and-async-await-own-fetch-data-func
  const fetchData = async (url) => {
    const response = await fetch(url);
    if(response.ok) {
      return response.json();
    } else {
      throw new Error("Error retrieving the data");
    }
  };
  
  useEffect(() => {
    fetchData(getURL)
    .then(json => {
      console.log(json.data);
      let matrix = [];
      if(typeof json.data !== 'undefined') {
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
  };
  
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { gpaRangeLower: "", gpaRangeUpper: "", satRangeLower: "", satRangeUpper: "", actRangeLower: "", actRangeUpper: "", awardAmount: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // let p = document.createElement('p');
    // p.innerHTML = JSON.stringify(convertInputData(inputList));
    // document.body.appendChild(p);

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(convertInputData(inputList)));
    fetch('https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/post/freshmanwithtest', {
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

  return (
    <div className="container-fluid">
      <div className="grid grid-x">
        <div className="cell medium-12 content-area">
          <form onSubmit={handleSubmit}>
            <h3>Freshman Merit Based - Matrix With Test Scores</h3> 
            <table id="ncc-data-dashboard" summary="Freshman Merit Based matrix with GPA, SAT/ACT scores.">
              <thead>
              <tr>
                <th className="text-center">GPA Range Lower Bound</th>
                <th className="text-center">GPA Range Upper Bound</th>
                <th className="text-center">SAT Range Lower Bound</th>
                <th className="text-center">SAT Range Upper Bound</th>
                <th className="text-center">ACT Range Lower Bound</th>
                <th className="text-center">ACT Range Upper Bound</th>
                <th className="text-center">Award Amount</th>
                <th className="text-center">&nbsp;</th>
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
                  <tr className="void-row">
                    <td colSpan="8">{inputList.length - 1 === i && <button className="button" onClick={handleAddClick}>Add Row</button>}</td>
                  </tr>
                  </React.Fragment>
                );
              }): <tr><td>Loading Matrix...</td></tr>}
              </tbody>
            </table>
            <div className="submit-button-row">
              <button className="button" onClick={()=>{handleClear()}}>Clear Matrix</button>
              <input type="submit" className="button submit-button" value="Submit Matrix" />
            </div>
          </form>
        </div>
      </div>
    </div> 
  );
}
