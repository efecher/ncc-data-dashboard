import React, { useState } from "react";
import './App.css';
import { data } from './data/merit.json';
import { v4 } from 'uuid';

function App() {
  // NOTE: transform the data into a "table" so we can use it properly
  let matrix = [[{}]];

  for(let r=0; r<data.length; r++) {
    let row = {
      gpaRangeLower: data[r][0],
      gpaRangeUpper: data[r][1],
      satRangeLower: data[r][2],
      satRangeUpper: data[r][3],
      actRangeLower: data[r][4],
      actRangeUpper: data[r][5],
      awardAmount: data[r][6]
    }
    matrix.push(row);
  }

  // NOTE: set state with the existing data already pre-populated
  
  const [inputList, setInputList] = useState(matrix);

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
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(convertInputData(inputList));
    document.body.appendChild(p);

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    return;
  };

  const convertInputData = (data) => {
    //console.log(data);
    let output = [];
    console.log(output);
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

  console.log(inputList);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Merit Based - Matrix With Test Scores</h3> 
        <table>
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
          <tbody>
            {inputList.map((x, i) => {
              return (
                <tr key={v4()}>
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
                  <div className="btn-box">
                    {inputList.length !== 1 && <button
                      className="remove-button"
                      onClick={() => handleRemoveClick(i)}>Remove Row</button>}
                    {inputList.length - 1 === i && <button className="add-button" onClick={handleAddClick}>Add Row</button>}
                  </div>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <div className="submit-button-row">
          <input type="submit" value="Submit Matrix" />
        </div>
      </form>
    </div> 
  );
}
export default App;