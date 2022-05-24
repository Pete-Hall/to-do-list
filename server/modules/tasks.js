const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

router.delete('/', (req, res)=>{
  console.log('in /tasks DELETE:', req.query);
  let queryString = `DELETE FROM tasks WHERE id=$1;`;
  let values = [req.query.id];
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

router.get('/', (req, res)=>{
  console.log('in /koalas GET');
  let queryString = `SELECT * FROM tasks ORDER BY id ASC;`; // added in ASC so the database wouldn't update the order when a value is updated (i.e. when a task is completed)
  pool.query(queryString).then((results)=>{
    res.send(results.rows);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

router.post('/', (req, res)=>{
  console.log('in /tasks POST:', req.body);
  // send INSERT query wtih sanitized inputs
  let queryString = `INSERT INTO tasks (description) VALUES ($1);`; 
  let values = [req.body.description];
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(201);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

router.put('/', (req, res)=>{
  console.log('in /tasks PUT:', req.query);
  let currentTime = moment().format('llll'); // Thu, Sep 4, 1986 8:30 PM (from https://momentjs.com/docs/#/displaying/)
  let queryStringTrue = `UPDATE tasks SET completed=true, timecompleted='${currentTime}' WHERE id=$1;`;
  let queryStringFalse = `UPDATE tasks SET completed=false, timecompleted='' WHERE id=$1;`;
  let values = [req.query.id];
  // checks if the task is completed or not, and switches the boolean to the opposite
  if(req.query.boolean === 'false') {
      pool.query(queryStringTrue, values).then((results)=>{
        //res.send(moment());
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
  } 
  else /*if(req.query.boolean === true)*/ {
      pool.query(queryStringFalse, values).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
  }
})

module.exports = router;