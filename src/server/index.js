const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { response } = require('express');


const app = express();
const port = 3001;

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname), "/public"));

app.get('/get', (req,res) => {
  console.log(res);
  let data;
  fs.readFile(__dirname + '../../../public/generated.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});


app.post('/post', (req,res) => {
  //console.log(req.body);
  filePath = __dirname + '../../../public/generated.json';
  fileContent = JSON.stringify(req.body);
  
  let message = {};
  fs.writeFile(filePath, fileContent, err => {
    if(err) {
      console.log(err);
      message = { error: 500, message: err, timestamp: Date.now()}
    } else {
      console.log("Written Successfully.");
      message = {
        response: 200,
        message: "Data successfully submitted.",
        timsetamp: Date.now()
      };
    }
  });
  
  res.write("Hello World");
  //res.end();
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});