import React /*, { useState, useEffect }*/ from "react";
import '../App.scss';
import Navigation from '../Navigation';



export default function Tuition() {
 /* const [inputList, setInputList] = useState(null);

  useEffect(() => {
    setInputList({
      totalTuition: ["","",""],
      tuitionAndFees: ["","",""],
      booksAndSupplies: ["","",""],
      roomAndBoard: ["","",""],
      otherExpenses: ["","",""],
      financialAidTuition: "",
      financialAidFees: "",
      financialAidRoomAndBoard: "",
      placeholder: "0"
    });
    fetch("http://localhost:3001/get/tuitioninfo")
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
      let matrix = [];
      for(let row of json.data) {
        let r = {
          totalTuition: row[0],
          tuitionAndFees: row[1],
          booksAndSupplies: row[2],
          roomAndBoard: row[3],
          otherExpenses: row[4],
          financialAidTuition: row[5],
          financialAidFees: row[6],
          financialAidRoomAndBoard: [7]
        }
        matrix.push(r);
      }
      setInputList(matrix);
    })
    .catch(error => {
      alert("Remote data doesn't exist. When submitted, this session will create a new record from scratch on the remote server.");
      console.log(error + " Cannot retrieve the remote data, perhaps we are creating a new file on the server?");
    });
  }, []);*/

  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10 content-area">
          <form /*onSubmit={handleSubmit}*/>
            <h3>Tuition</h3> 
            <table summary="EFC Independent with no Dependents">
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>On Campus</th>
                  <th>On Own</th>
                  <th>Home</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Tuition</td>
                  <td><input name="totalTuitionOnCampus" /></td>
                  <td><input name="totalTuitionOnOwn" /></td>
                  <td><input name="totalTuitionHome" /></td>
                </tr>
                <tr>
                  <td>Tuition and Fees</td>
                  <td><input name="tuitionAndFeesOnCampus" /></td>
                  <td><input name="tuitionAndFeesOnOwn" /></td>
                  <td><input name="tuitionAndFeesHome" /></td>
                </tr>
                <tr>
                  <td>Books and Supplies</td>
                  <td><input name="booksSuppliesOnCampus" /></td>
                  <td><input name="booksSuppliesOnOwn" /></td>
                  <td><input name="booksSuppliesHome" /></td>
                </tr>
                <tr>
                  <td>Room and Board</td>
                  <td><input name="roomBoardOnCampus" /></td>
                  <td><input name="roomBoardOnOwn" /></td>
                  <td><input name="roomBoardHome" /></td>
                </tr>
                <tr>
                  <td>Other Expenses</td>
                  <td><input name="otherExpensesCampus" /></td>
                  <td><input name="otherExpensesOnOwn" /></td>
                  <td><input name="otherExpensesHome" /></td>
                </tr>
              </tbody>
            </table>
            <h3>From SHU Financial Aid</h3>
            <table summary="From SHU financial aid">
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tuition</td>
                  <td><input name="financialAidTuition" /></td>
                </tr>
                <tr>
                  <td>Fees</td>
                  <td><input name="financialAidFees" /></td>
                </tr>
                <tr>
                  <td>Room and Board</td>
                  <td><input name="financialAidRoomBoard" /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>      
  );
}