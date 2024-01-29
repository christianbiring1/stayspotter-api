const express = require('express');

const route = express.Router();

// CREATE A SPOT
route.post('/', async(req, res) => {
  const {user_id, address, city, state, country, name, price} = req.body;

});

// GET ALL POSTS
route.get('/', async(req, res) => {

  const spots = [];
  res.send(spots)
});

module.exports = route;