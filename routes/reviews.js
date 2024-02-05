const express = require('express');
const Joi = require('joi');


const { Review, Spot, User } = require('../models');

const route = express.Router();

// CREATE A REVIEW
route.post('/', async(req, res) => {
  
  const { user_id, spot_id, description, rating } = req.body;

  const { error } = validateReview(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  try {
    
    const review = await Review.create({ user_id, spot_id, description, rating });
  
    res.status(200).send(review)
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
})

// GET ALL REVIEWS FOR A SPECIFIC SPOT
route.get('/:id', async(req, res) => {

  const spot_id = req.params.id;

  try {
    const reviews = await Review.findAll({ where: { spot_id }, include: 'user' });
    res.status(200).send(reviews);
   
  } catch (error) {
    res.status(500).send('Internal Server error!')
    //Log the error on the Logging service
  }
});

route.delete('/:id', async(req, res) => {
  const review_id = req.params.id;

  try {
    const review = await Review.findOne({ where: { spot_id }});
    review.destroy();

    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error)
  }
})

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
