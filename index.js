const express = require('express');
const config = require('config');

const db = require('./models');
const logger = require('./middleware/logger');
const bookings = require('./routes/bookings');
const favorites = require('./routes/favorites');
const reviews = require('./routes/reviews');
const spots = require('./routes/spots');
const users = require('./routes/users');

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://christian:Zih&bir22@localhost:5432/stayspotter') already set in the config

const app = express();
app.use(express.json());
app.use(logger) // Logging middleware

app.use('/api/bookings', bookings);
app.use('/api/favorites', favorites);
app.use('/api/reviews', reviews);
app.use('/api/spots', spots);
app.use('/api/users', users);


if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1)
}



const port = process.env.NODE_ENV || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  db.sequelize.authenticate()
    .then('Connected to the database successfully!...')
    .catch(err => {
      console.log('Could not connect o the database...', err);
    })
})
