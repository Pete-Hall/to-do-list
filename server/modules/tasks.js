const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

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
  let queryString = `SELECT * FROM tasks;`;
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
  let queryString = `UPDATE tasks SET completed=true WHERE id=$1;`;
  let values = [req.query.id];
  pool.query(queryString, values).then((results)=>{
    res.sendStatus(200);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  })
})

module.exports = router;