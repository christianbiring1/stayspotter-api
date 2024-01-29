const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();

const { User } = require('../models');


route.post('/', async(req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, hashedPassword });

  res.status(200).send(user);
})
// GET ALL USERS
route.get('/', async(req, res) => {

  const users = [];
  res.send(users)
});


module.exports = route;
