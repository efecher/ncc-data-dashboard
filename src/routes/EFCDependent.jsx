import React, { useState, useEffect } from "react";
import '../App.scss';
import Navigation from '../Navigation';



export default function TuitionAssistanceGrant() {
  // NOTE: set state with the existing data already pre-populated
  const [inputList, setInputList] = useState(null);
  
  useEffect(() => {
    setInputList([{
      numInCollege: "",
      numInFamily: "",
      lessThirtyK: "",
      thirtyKTo39999: "",
      fortyKTo49999: "",
      fiftyKto59999: "",
      sixtyKTo69999: "",
      seventyKTo79999: "",
      eightyKTo89999: "",
      ninetyKTo99999: "",
      over99999: "",
      placeholder: "Enter a value..."
    }]);
    fetch("http://localhost:3001/get/efcdependent")
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
          numInCollege: row[0],
          numInFamily: row[1],
          lessThirtyK: row[2],
          thirtyKTo39999: row[3],
          fortyKTo49999: row[4],
          fiftyKto59999: row[5],
          sixtyKTo69999: row[6],
          seventyKTo79999: row[7],
          eightyKTo89999: row[8],
          ninetyKTo99999: row[9],
          over99999: row[10]
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
      numInCollege: "",
      numInFamily: "",
      lessThirtyK: "",
      thirtyKTo39999: "",
      fortyKTo49999: "",
      fiftyKto59999: "",
      sixtyKTo69999: "",
      seventyKTo79999: "",
      eightyKTo89999: "",
      ninetyKTo99999: "",
      over99999: "",
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
    setInputList([...inputList, { 
      numInCollege: "",
      numInFamily: "",
      lessThirtyK: "",
      thirtyKTo39999: "",
      fortyKTo49999: "",
      fiftyKto59999: "",
      sixtyKTo69999: "",
      seventyKTo79999: "",
      eightyKTo89999: "",
      ninetyKTo99999: "",
      over99999: "" 
    }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(convertInputData(inputList));
    document.body.appendChild(p);

    // NOTE: eventually, code to store the input somewhere to persist it so it can be loaded next run
    console.log(JSON.stringify(convertInputData(inputList)));
    fetch('http://localhost:3001/post/efcdependent', {
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
        (data[i].numInCollege === "")? 0 : parseInt(data[i].numInCollege), 
        (data[i].numInFamily === "")? 0 : parseInt(data[i].numInFamily), 
        (data[i].lessThirtyK === "")? 0 : parseInt(data[i].lessThirtyK),
        (data[i].thirtyKTo39999 === "")? 0 : parseInt(data[i].thirtyKTo39999),
        (data[i].fortyKTo49999 === "")? 0 : parseInt(data[i].fortyKTo49999),
        (data[i].fiftyKto59999 === "")? 0 : parseInt(data[i].fiftyKto59999),
        (data[i].sixtyKTo69999 === "")? 0 : parseInt(data[i].sixtyKTo69999),
        (data[i].seventyKTo79999 === "")? 0 : parseInt(data[i].seventyKTo79999),
        (data[i].eightyKTo89999 === "")? 0 : parseInt(data[i].eightyKTo89999),
        (data[i].ninetyKTo99999 === "")? 0 : parseInt(data[i].ninetyKTo99999),
        (data[i].over99999 === "")? 0 : parseInt(data[i].over99999),
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
            <h3>EFC Dependent</h3> 
            <table summary="EFC Dependent">
              <thead>
              <tr>
                <th>No. In College</th>
                <th>No. In Family</th>
                <th>&lt; $30,000</th>
                <th>$30,000-39,999</th>
                <th>$40,000-49,999</th>
                <th>$50,000-59,999</th>
                <th>$60,000-69,999</th>
                <th>$70,000-79,999</th>
                <th>$80,000-89,999</th>
                <th>$90,000-99,999</th>
                <th>&gt; $99,999</th>
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
                          name="numInCollege"
                          placeholder={x.placeholder}
                          value={x.numInCollege}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="numInFamily"
                          placeholder={x.placeholder}
                          value={x.numInFamily}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="lessThirtyK"
                          placeholder={x.placeholder}
                          value={x.lessThirtyK}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="thirtyKTo39999"
                          placeholder={x.placeholder}
                          value={x.thirtyKTo39999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="fortyKTo49999"
                          placeholder={x.placeholder}
                          value={x.fortyKTo49999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="fiftyKTo59999"
                          placeholder={x.placeholder}
                          value={x.fiftyKTo59999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="sixtyKTo69999"
                          placeholder={x.placeholder}
                          value={x.sixtyKTo69999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="seventyKTo79999"
                          placeholder={x.placeholder}
                          value={x.seventyKTo79999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="eightyKTo89999"
                          placeholder={x.placeholder}
                          value={x.eightyKTo89999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="ninetyKTo99999"
                          placeholder={x.placeholder}
                          value={x.ninetyKTo99999}
                          onChange={e => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <input
                          name="over99999"
                          placeholder={x.placeholder}
                          value={x.over99999}
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
