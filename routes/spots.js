const Joi = require('joi');
const express = require('express');

const { Spot } = require('../models');

const route = express.Router();

// CREATE A SPOT
route.post('/', async(req, res) => {
  const {user_id, address, city, state, country, name, price} = req.body;

  const { error } = validateSpot(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const spot = await Spot.create({ user_id, address, city, state, country, name, price });

  res.status(201).send(spot)
});

// GET ALL POSTS
route.get('/', async(req, res) => {

  const spots = [];
  res.send(spots)
});

function validateSpot(spot) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().min(1).max(9999)
  });

  return schema.validate(spot);
}

module.exports = route;