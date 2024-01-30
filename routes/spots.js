const Joi = require('joi');
const express = require('express');

const { Spot } = require('../models');

const route = express.Router();

// GET ALL SPOTS
route.get('/', async(req, res) => {

  const spots = await Spot.findAll();
  res.status(200).send(spots)
});

// GET A SINGLE SPOT
route.get('/:id', async(req, res) => {
  // Look up a spot,
  const spot = await Spot.findOne({ where: {'id': parseInt(req.params.id) } });

  // If not existing, return 404 Bad request
  if(!spot) return res.status(404).send('The resource was not found');

  // If found one, return it to the client
  res.status(200).send(spot)
})

// CREATE A SPOT
route.post('/', async(req, res) => {
  const {user_id, address, city, state, country, name, price} = req.body;

  const { error } = validateSpot(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const spot = await Spot.create({ user_id, address, city, state, country, name, price });

  res.status(201).send(spot)
});

// UPDATE A SPOT
route.put('/:id', async(req, res) => {
  const { address, city, state, country, name, price } = req.body;

  //Look up the spot
  const spot = await Spot.findOne({ where: { 'id': req.params.id }});

  //If not existing, return 404 - Bad request
  if(!spot) return res.status(404).send('The resource you were looking for was not found');

  //If one, update it - retun it to the client
  await spot.update({ address, city, state, country, name, price }, {
    where: { 'id': req.params.id }
  });

  await spot.save();
  res.status(201).send(spot)
});

// DELETE A SPOT
route.delete('/:id', async(req, res) => {
  // Look up the spot
  const spot = await Spot.findByPk(parseInt(req.params.id));

  // If not existing, return 404 - Bad request
  if(!spot) return res.status(404).send('The resource was not found');

  // If find one, delete it
  await spot.destroy({ where: { 'id': req.params.id }});

  res.status(200).send(spot);
})

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