const db = require('./models');
const bookings = require('./routes/bookings');
const favorites = require('./routes/favorites');
const reviews = require('./routes/reviews');
const spots = require('./routes/spots');
const users = require('./routes/users');

const express = require('express');
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://christian:Zih&bir22@localhost:5432/stayspotter') already set in the config

const app = express();
app.use(express.json());

app.use('/api/bookings', bookings);
app.use('/api/favorites', favorites);
app.use('/api/reviews', reviews);
app.use('/api/spots', spots);
app.use('/api/users', users);



db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database successfully!...')
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`App listening on port ${port}`))
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  })


