import React, { useState, useEffect } from "react";
import '../App.scss';

export default function FreshmanWithTest() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  // NOTE: set saved state of this dashboard
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    setInputList([{
      gpaRangeLower: "",
      gpaRangeUpper: "",
      satRangeLower: "",
      satRangeUpper: "",
      actRangeLower: "",
      actRangeUpper: "",
      awardAmount: "",
      placeholder: "0"
    }]);
    fetch("https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/get/freshmanwithtest")
    .then((response) => {
      if(response.ok) {
        try {
          return response.json();
        } catch(e) {
          throw new Error();
        }
      } else {
        throw new Error('Error retrieving the remote data.');
      }
    })
    .then(json => {
      console.log(json.data); 
      let matrix = [];
      for(let row of json.data) {
        let r = {
          gpaRangeLower: row[0],
          gpaRangeUpper: row[1],
          satRangeLower: row[2],
          satRangeUpper: row[3],
          actRangeLower: row[4],
          actRangeUpper: row[5],
          awardAmount: row[6],
          //placeholder: 0
        }
        matrix.push(r);
      }
      setInputList(matrix);
    }) 
    .catch(error => {
      console.log("Remote data doesn't exist. When submitted, this session will create a new record from scratch on the remote server.");
      console.log(error + " Cannot retrieve the remote data, perhaps we are creating a new file on the server?");
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // let p = document.createElement('p');
    // p.innerHTML = JSON.stringify(convertInputData(inputList));
    // document.body.appendChild(p);

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(convertInputData(inputList)));
    await fetch('https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/post/freshmanwithtest', {
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
                <th>GPA Range Lower Bound</th>
                <th>GPA Range Upper Bound</th>
                <th>SAT Range Lower Bound</th>
                <th>SAT Range Upper Bound</th>
                <th>ACT Range Lower Bound</th>
                <th>ACT Range Upper Bound</th>
                <th>Award Amount</th>
                <th>&nbsp;</th>
              </tr>
              </thead>
              <tbody style={(saved)? {animation: "savedTable 1s ease-in-out"}: {backgroundColor: "#fefefe"}}>
                {
                  (inputList !== null)? inputList.map((x, i) => {
                  return (
                    <React.Fragment key={`table-input-${i}`}>
                    <tr>
                      <td>
                        <input
                          name="gpaRangeLower"
                          placeholder="0"
                          value={x.gpaRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="gpaRangeUpper"
                          placeholder="0"
                          value={x.gpaRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="satRangeLower"
                          placeholder="0"
                          value={x.satRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="satRangeUpper"
                          placeholder="0"
                          value={x.satRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="actRangeLower"
                          placeholder="0"
                          value={x.actRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="actRangeUpper"
                          placeholder="0"
                          value={x.actRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="awardAmount"
                          placeholder="0"
                          value={x.awardAmount}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                    <td>
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
