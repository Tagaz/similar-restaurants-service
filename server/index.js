require('newrelic');
const express = require('express');
const cors = require('cors');
const db = require('../database');
const bodyParser = require('body-parser');
const pg = require('../PostGreSQLDB/copyindex.js');

const app = express();
const port = 3004;

app.use('/:id', express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/restaurants/:id', (req, res) => {
  console.log('app.get is firing');
  pg.fetchRestaurants(req.params.id)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(() => res.status(500).send('An error occurred'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
