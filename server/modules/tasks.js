const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let tasks = [];

router.post('/', (req, res)=>{
  console.log('in /tasks POST:', req.body);
  tasks.push(req.body);
  res.sendStatus(201);
})

module.exports = router;