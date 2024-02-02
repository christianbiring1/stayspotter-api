const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();

const { User } = require('../models');

// SIGN IN
route.post('/', async(req, res) => {
  const { username, email, password } = req.body;

  // Validate the user
  // If Invalid, return 400 - Bad request
  const { error } = validateUser(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  // Look up to the user
  // If exist, return 400 - Bad request
  try {
    
    let user = await User.findOne({ where: { email }});
    if(user) return res.status(400).send('User with the given email already existed!');
  
    // If not find, create one
    // Save it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    user = await User.create({ username, email, hashedPassword });
    res.status(200).send(user);
  
  } catch (error) {
    res.status(500).send('Internal Server error!')
  }
})

// Validate the user object

function validateUser (user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(5).required()
  })

  return schema.validate(user)
};

module.exports = route;
