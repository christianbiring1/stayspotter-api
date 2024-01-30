const express = require('express');
const { Review } = require('../models');
const Joi = require('joi');


const route = express.Router();

route.post('/', async(req, res) => {
  
  const { user_id, spot_id, description, rating } = req.body;

  const { error } = validateReview(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  
  const review = await Review.create({ user_id, spot_id, description, rating });

  res.status(200).send(review)
})

// GET ALL REVIEWS
route.get('/', async(req, res) => {

  const reviews = Review.findAll();
  res.status(200).send(reviews);
});


function validateReview(review) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    spot_id: Joi.string().required(),
    description: Joi.string(),
    rating: Joi.string().required()
  });

  return schema.validate(review);
};


module.exports = route;
