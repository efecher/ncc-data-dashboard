import React, { useState, useEffect } from "react";
import '../App.scss';
import Navigation from '../Navigation';



export default function Pell() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  
  useEffect(() => {
    setInputList([{
      minEFC: "",
      maxEFC: "",
      awardAmount: "",
      placeholder: "Enter a value..."
    }]);
    fetch("http://localhost:3001/get/pell")
    .then((response) => {
      if(response.ok) {
        try {
          JSON.parse(response);
        } catch(e) {
          throw new Error();
        }
        return response.json();
      } else {
        throw new Error('Error retrieving the remote data.');
      }
    })
    .then(json => {
      console.log(json.data); 
      let matrix = [];
      for(let row of json.data) {
        let r = {
          minEFC: row[0],
          maxEFC: row[1],
          awardAmount: row[2],
          //placeholder: 0
        }
        matrix.push(r);
      }
      setInputList(matrix);
    }) 
    .catch(error => {
      alert("Remote data doesn't exist. When submitted, this session will create a new record from scratch on the remote server.");
      console.log(error + " Cannot retrieve the remote data, perhaps we are creating a new file on the server?");
    });
  }, []);

  // handle clear button
  const handleClear = () => {
    setInputList([{
      minEFC: "0",
      maxEFC: "0",
      awardAmount: "0",
      placeholder: "Enter a value..."
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
    setInputList([...inputList, { minEFC: "", maxEFC: "",  awardAmount: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(convertInputData(inputList));
    document.body.appendChild(p);

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(convertInputData(inputList)));
    fetch('http://localhost:3001/post/pell', {
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
    //console.log(data);
    let output = [];
    for(let i=0; i<data.length; i++) {
      let row = [];

      row.push(
        // NOTE: Check if input is a number first before converting from string, empty strings, as in the initial values of the inputs are NaN
        (data[i].minEFC === "")? 0 : parseInt(data[i].minEFC), 
        (data[i].maxEFC === "")? 0 : parseInt(data[i].maxEFC), 
        (data[i].awardAmount === "")? 0 : parseInt(data[i].awardAmount)
      );
      output.push(row);
    }

    return output;
  }

  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10 content-area">
          <form onSubmit={handleSubmit}>
            <h3>Pell</h3> 
            <table summary="Transfer - Merit Based (GPA)">
              <thead>
              <tr>
                <th>EFC Range Lower Bound</th>
                <th>EFC Range Upper Bound</th>
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
                      <td>
                        <input
                          name="minEFC"
                          placeholder={x.placeholder}
                          value={x.minEFC}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="maxEFC"
                          placeholder={x.placeholder}
                          value={x.maxEFC}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="awardAmount"
                          placeholder={x.placeholder}
                          value={x.awardAmount}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                    <td>
                      {inputList.length !== 1 && <button
                        className="remove-button"
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
              <button className="clear-button" onClick={()=>{handleClear()}}>Clear Matrix</button>
              <input type="submit" value="Submit Matrix" />
            </div>
          </form>
        </div>
      </div>
    </div> 
  );
}