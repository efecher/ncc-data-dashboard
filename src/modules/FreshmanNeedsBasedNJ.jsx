import React, { useState, useEffect } from "react";
import '../App.scss';
import Navigation from '../Navigation';

export default function FreshmanNeedsBasedNJ() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);

  useEffect(() => {
    setInputList([{
      efcRangeLower: "",
      efcRangeUpper: "",
      awardAmount: "",
      placeholder: "0"
    }]);
    fetch("https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/get/freshmanneedsbasednj")
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
      if(typeof json.data !== 'undefined') {
        for(let row of json.data) {
          let r = {
            efcRangeLower: row[0],
            efcRangeUpper: row[1],
            awardAmount: row[2],
            //placeholder: 0
          }
          matrix.push(r);
        }
      } else {
        matrix.push({
          efcRangeLower: 0,
          efcRangeUpper: 0,
          awardAmount: 0
        });
      }
      setInputList(matrix);
    }) 
    .catch(error => {
      console.log(error);
    });
  }, []);

  // handle clear button
  const handleClear = () => {
    setInputList([{
      efcRangeLower: "0",
      efcRangeUpper: "0",
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
    setInputList([...inputList, { efcRangeLower: "", efcRangeUpper: "", awardAmount: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(inputList);
    //console.log(JSON.stringify(convertInputData(inputList)));

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(inputList));
    fetch('https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/post/freshmanneedsbasednj', {
      accepts: 'application/json, plain/text',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({data: convertInputData(inputList)})
    })
    .then(res => { console.log(res) })
    .catch(res => console.log(res));

    return;
  };

  const convertInputData = (data) => {
    console.log(data);
    let output = [];
    for(let i=0; i<data.length; i++) {
      let row = [];

      row.push(
        // NOTE: Check if input is a number first before converting from string, empty strings, as in the initial values of the inputs are NaN
        (data[i].efcRangeLower === "")? 0 : parseInt(data[i].efcRangeLower), 
        (data[i].efcRangeUpper === "")? 0 : parseInt(data[i].efcRangeUpper), 
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
            <h3>Freshman Needs-Based (NJ Residents)</h3> 
            <table id="ncc-data-dashboard" summary="Needs-Based, NJ Resident.">
              <thead>
              <tr>
                <th className="text-center">Minimum EFC</th>
                <th className="text-center">Maximum EFC</th>
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
                          name="efcRangeLower"
                          placeholder={x.placeholder}
                          value={x.efcRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="efcRangeUpper"
                          placeholder={x.placeholder}
                          value={x.efcRangeUpper}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="awardAmount"
                          placeholder={x.placeholder}
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
                    <td colSpan="8">{inputList.length - 1 === i && <button className="add-button" onClick={handleAddClick}>Add Row</button>}</td>
                  </tr>
                  </React.Fragment>
                );
              }): <tr><td>Loading Matrix...</td></tr>}
              </tbody>
            </table>
            <div className="submit-button-row">
              <button className="button" onClick={()=>{handleClear()}}>Clear Matrix</button>
              <input type="submit" className="button" value="Submit Matrix" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}