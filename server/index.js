const express = require('express');
const cors = require('cors');
const db = require('../database');

const app = express();
const port = 3004;

app.use('/:id', express.static('public'));
app.use(cors());
app.use(express.json());

// Create
app.post('api/restaurants/', (req, res) => {
  console.log('req.body', req.body)
  db.createRestaurant(req.body)
    .then(() => {
      res.senStatus(200).send('Restaurant was created');
    })
    .catch(() => {
      res.status(500)
    })
})

// Read
app.get('api/restaurants/:id', (req, res) => {
  const allData = {};
  const argsTitle = [req.params.id];
  return db.getTitle(argsTitle)
    .then((dataTitle) => {
      const restaurant = dataTitle[0];
      allData.restaurant = {
        name: restaurant.name,
        category: restaurant.category,
        neighborhood: restaurant.neighborhood,
      };
      const argsSimilar = [restaurant.category, restaurant.neighborhood, argsTitle[0]];
      return db.getSimilar(argsSimilar);
    })
    .then((dataSimilar) => {
      allData.similar = dataSimilar;
      const results = dataSimilar.map((item) => {
        const argsPhotos = [item.rid];
        return Promise.resolve(db.getPhotos(argsPhotos));
      });
      return Promise.all(results);
    })
    .then((dataPhotos) => {
      allData.photos = dataPhotos;
    })
    .then(() => {
      res.status(200).send(allData);
    })
    .catch(() => {
      res.status(500).send('error in getting the data from the db');
    });
});


// Update
app.put('api/restaurants/:id', (req, res) => {
  db.updateRestaurant(req.params.id, req.body)
  .then(() => {
    res.status(202)
  })
  .catch(() => {
    res.status(500)
  })
})

// Delete
app.delete('/restaurants/:id', (req, res) => {
  db.deletePhotos(req.params.id)
    .then(() => {
      db.deleteRestaurant(req.params.id)
        .then(() => {
          res.status(202)
        })
    })
    .catch(() => {
      res.status(500)
    })
})



app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
