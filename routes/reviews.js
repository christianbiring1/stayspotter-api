const express = require('express');
const route = express.Router();

route.post('/', async(req, res) => {
  const { user_id, spot_id, description, rating } = req.body;
})

// GET ALL REVIEWS
route.get('/', async(req, res) => {

  const favorites = [];
  res.send(favorites);
});

module.exports = route;
