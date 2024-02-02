const Joi = require('joi');
const express = require('express');

const { Spot } = require('../models');

const route = express.Router();

// GET ALL SPOTS
route.get('/', async(req, res) => {
  try {

    const spots = await Spot.findAll();
    res.status(200).send(spots)

  } catch (error) {
    res.status(500).send('Internal Server error!')
    // Log the error on a logging service
  }
});

// GET A SINGLE SPOT
route.get('/:id', async(req, res) => {

  try {
    
    // Look up a spot,
    const spot = await Spot.findOne({ where: {'id': parseInt(req.params.id) } });
  
    // If not existing, return 404 Bad request
    if(!spot) return res.status(404).send('The resource was not found');
  
    // If found one, return it to the client
    res.status(200).send(spot)
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
})

// CREATE A SPOT
route.post('/', async(req, res) => {

  const {user_id, address, city, state, country, name, price} = req.body;
  try {

    const { error } = validateSpot(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    const spot = await Spot.create({ user_id, address, city, state, country, name, price });
  
    res.status(201).send(spot)
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
});

// UPDATE A SPOT
route.put('/:id', async(req, res) => {
  const { address, city, state, country, name, price } = req.body;
  try {
    
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
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
});

// DELETE A SPOT
route.delete('/:id', async(req, res) => {
  // Look up the spot
  try {
    
    const spot = await Spot.findByPk(parseInt(req.params.id));
  
    // If not existing, return 404 - Bad request
    if(!spot) return res.status(404).send('The resource was not found');
  
    // If find one, delete it
    await spot.destroy({ where: { 'id': req.params.id }});
  
    res.status(200).send(spot);
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
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