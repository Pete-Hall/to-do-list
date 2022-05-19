const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res)=>{
  console.log('in /tasks POST:', req.body);
  // send INSERT query wtih sanitized inputs
  let queryString = `INSERT INTO tasks (description) VALUES ($1);`; 
  let values = [req.body.description];
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;