const express = require('express');
const fs = require('fs');
const { checkServerIdentity } = require('tls');
const app = express();

app.use((req, res, next) => {
// write your logging code here
 let agent = req.headers['user-agent'].replace(",",'');
 let time = new Date();
 let method = req.method;
 let resource = req.path;
 let version = `HTTP/${req.httpVersion}`;
 let status = res.statusCode;

 let logger = `${agent},${time.toISOString()},${method},${resource},${version},${status}\n`
 console.log(logger);
 
 fs.appendFile('log.csv', logger, err => {
    if (err) throw err 
      console.log(err);
    
  });
  next();

});

// //Might delete
// const reqAgent = req.headers['user-agent'].replace(',','');

//Should show ok
app.get('/', (req, res) => {
// write your code to respond "ok" here
 res.status(200).send('ok');
});


//Endpoint that views log.csv
app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
 cvs()
    .fromFile(csvfilePath)
    .then((jsonObj) => {
        res.send(jsonObj);

    })
});

module.exports = app;
