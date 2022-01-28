import React, { useState, useEffect } from 'react';


function FreshmanTestOptional() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  // NOTE: set saved state of this dashboard
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setInputList([{
      gpaRangeLower: "",
      gpaRangeUpper: "",
      awardAmount: "",
      placeholder: "0"
    }]);
    fetch("https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/get/freshmantestoptional")
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
            gpaRangeLower: row[0],
            gpaRangeUpper: row[1],
            awardAmount: row[2]
          }
          matrix.push(r);
        }
      } else {
        matrix.push({
          gpaRangeLower: 0,
          gpaRangeUpper: 0,
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
      gpaRangeLower: "0",
      gpaRangeUpper: "0",
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
    setInputList([...inputList, { gpaRangeLower: "", gpaRangeUpper: "", awardAmount: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(convertInputData(inputList)));
    fetch('https://site8.auth.dev.shu.commonspotcloud.com/rest/data/costcalculator/post/freshmantestoptional', {
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
            <h3>Merit Based - Matrix Without Test Scores</h3> 
            <table id="ncc-data-dashboard" summary="Merit Based matrix - Test Optional.">
              <thead>
              <tr>
                <th className="text-center">GPA Range Lower Bound</th>
                <th className="text-center">GPA Range Upper Bound</th>
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
                          placeholder={x.placeholder}
                          value={x.gpaRangeLower}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          name="gpaRangeUpper"
                          placeholder={x.placeholder}
                          value={x.gpaRangeUpper}
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

export default FreshmanTestOptional;