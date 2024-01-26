const express = require('express');
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://christian:Zih&bir22@localhost:5432/stayspotter')

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
});

async function testingConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testingConnection();


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})