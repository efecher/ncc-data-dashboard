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
      res.send({data: null});
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

app.get('/get/merit/transfer', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/merittransfer.json', (err, json) => {
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

app.get('/get/transfer/transferneedsbasednj/', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/transferneedsbasednj.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/transfer/transferneedsbasednonnj/', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/transferneedsbasednonnj.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/needs/freshmannonnj', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/needsfreshmannonnj.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/tag', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/tag.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/pell', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/pell.json', (err, json) => {
    if(err) {
      console.log(err);
    } else {
      let obj = JSON.parse(json);
      res.json(obj);
    }
  });
});

app.get('/get/efcdependent', (req,res) => {
  console.log(res);
  fs.readFile(__dirname + '/efcdependent.json', (err, json) => {
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

app.post('/post/efcdependent', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/efcdependent.json';
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

app.post('/post/merit/transfer', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/merittransfer.json';
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

app.post('/post/pell', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/pell.json';
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

app.post('/post/tag', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/tag.json';
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

app.post('/post/needs/freshmannonnj', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/needsfreshmannonnj.json';
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

app.post('/post/transfer/transferneedsbasednj/', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/transferneedsbasednj.json';
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

app.post('/post/transfer/transferneedsbasednonnj/', (req,res) => {
  console.log(req.body);
  filePath = __dirname + '/transferneedsbasednonnj.json';
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