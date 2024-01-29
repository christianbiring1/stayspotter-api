const express = require('express');
const route = express.Router();


route.post('/', async(req, res) => {
  const { name, email, password } = req.body;
  
})
// GET ALL USERS
route.get('/', async(req, res) => {

  const users = [];
  res.send(users)
});


module.exports = route;
