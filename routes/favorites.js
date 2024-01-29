const express = require('express');
const route = express.Router();

route.post('/', async(req, res) => {
  const { spot_id, user_id, favorite} = req.body;

})
// GET ALL FAVORITES
route.get('/', async(req, res) => {

  const favorites = [];
  res.send(favorites);
});

module.exports = route;
