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

app.get('/get/merit/testscores', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/merittestscores.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/merit/testoptional', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/merittestoptional.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/needs/freshmannj', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/needsfreshmannj.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.post('/post/merit/testscores', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/merittestscores.json';
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
});

app.post('/post/merit/testoptional', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/merittestoptional.json';
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
});

app.post('/post/needs/freshmannj', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/needsfreshmannj.json';
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
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});