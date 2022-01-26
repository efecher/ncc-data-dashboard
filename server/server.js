const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const fs = require('fs');


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());


app.get('/rest/data/get/:category', [(req, res, next) => {
  fs.readFile(__dirname + '/json/' + req.params.category + '.json', (err, json) => {
    if (err) {
      next(err)
    } else {
      let obj = JSON.parse(json);
      res.send(obj);
    }
  });
}]);


app.post('/post/merit/testscores', (req, res) => {
  console.log(req.body);
  filePath = __dirname + '/merittestscores.json';
  fileContent = JSON.stringify(req.body);

  let message = {};
  fs.writeFile(filePath, fileContent, err => {
    if (err) {
      console.log(err);
      message = { error: 500, message: err, timestamp: Date.now() }
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


// NOTE: Custom "friendly" error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    status: 500,
    message: 'internal error, likely data not found',
    type: 'server'
  });
});