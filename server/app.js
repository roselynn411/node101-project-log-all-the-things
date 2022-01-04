const express = require('express');
const fs = require('fs');
const app = express();
const csvParser = require('csvtojson');
const csvFilePath = './log.scv';

let log;

const logger = (req, res, next) => {
// write your logging code here
  // console.log("Logging!");
  const reqAgent = req.headers['user-agent'].replace(',', '');
  const reqTime = new Date().toISOString();
  const reqMethod = req.method;
  const reqResource = req.url;
  const reqVersion = `HTTP/${req.httpVersion}`;
  //currently console.logging as ---> null
  const reqStatus = 200;

  log = `${reqAgent},${reqTime},${reqMethod},${reqResource},${reqVersion},${reqStatus}\n`;
  // console.log(fs);
  fs.appendFile("log.scv", log, (err) => {
    if(err){
      console.log(err);
    } else {
      console.log('it works!');
      log = ``;
    }
  });
  next();
};

app.use(logger);

app.get('/', (req, res) => {
// write your code to respond "ok" here
  res.status(200).send('ok');
  console.log(log.toString());
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
  csvParser()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      // currently returning an empty array??
      res.status(200).send(jsonObj);
    });
});

module.exports = app;
