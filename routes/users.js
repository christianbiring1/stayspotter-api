const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');

const route = express.Router();
const { User } = require('../models');

route.get('/', async(req, res) => {
  const users = await User.findAll()

  res.status(200).send(users)
})

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
    if(user) return res.status(400).send('User already registered!');
  
    // If not find, create one
    // Save it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    user = await User.create({ username, email, hashedPassword });
    res.status(200).send(_.pick(user, ['uuid', 'username', 'email']));
  
  } catch (error) {
    res.status(500).send('Internal Server error!')
  }
})


// LOGIN
route.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate the user input
  // If invalid, return 400 - Bad request
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Look up the user
    const user = await User.findOne({ where: { email } });

    // If the user doesn't exist, return 400 - Bad request
    if (!user) return res.status(400).send('Invalid email or password.');

    // Check if the provided password is correct
    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // Generate a token
    const token = jwt.sign({ userId: user.uuid }, config.get('jwtPrivateKey'), { expiresIn: '1w' }); // Change 'app-secret-key' to a secret key for JWT

    // Set the token in the response header
    res.header('x-auth-token', token);

    // Set a cookie with the token that expires in a week
    res.cookie('authToken', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

    // Send user data without sensitive information
    res.status(200).send(_.pick(user, ['uuid', 'username', 'email']));

  } catch (error) {
    res.status(500).send('Internal Server Error!');
  }
});

// Validate the user object on sign up
function validateUser (user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    password: Joi.string().min(5).required()
  })

  return schema.validate(user)
};

// Validate user on logins
function validateLogin(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(user)
}

module.exports = route;
