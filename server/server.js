// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasks = require('./modules/tasks');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', tasks);

// globals
const port = 5001;

// spin up server
app.listen(port, ()=>{
  console.log('server up:', port);
})