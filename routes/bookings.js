const express = require('express');
const route = express.Router();

route.post('/', async(req, res) => {
  const {spot_id, user_id, start_date, end_date} = req.body;

});

route.get('/', async(req, res) => {

  const bookings = [];
  res.send(bookings);
})

module.exports = route;
