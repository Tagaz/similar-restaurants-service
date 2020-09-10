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

// Create
// app.post('api/restaurants/', (req, res) => {
//   console.log('req.body', req.body)
//   db.createRestaurant(req.body)
//     .then(() => {
//       res.senStatus(200).send('Restaurant was created');
//     })
//     .catch(() => {
//       res.status(500)
//     })
// })

// Read
// app.get('/restaurants/:id', (req, res) => {
//   console.log(req.params.id);
//   const allData = {};
//   const argsTitle = [req.params.id];
//   return pg.getTitle(argsTitle)
//     .then((dataTitle) => {
//       const restaurant = dataTitle[0];
//       allData.restaurant = {
//         name: restaurant.name,
//         category: restaurant.category,
//         neighborhood: restaurant.neighborhood,
//       };
//       const number = parseInt(req.params.id);
//       const argsSimilar = [restaurant.category, restaurant.neighborhood, number];
//       return pg.getSimilar(argsSimilar);
//     })
//     .then((dataSimilar ) => {
//       const similarRest = dataSimilar.rows;
//       allData.similar = dataSimilar.rows;
//       const results = similarRest.map((item) => {
//         const argPhotos = item.rid;
//         return Promise.resolve(pg.getPhotos(argPhotos));
//       });
//       return Promise.all(results);
//     })
//     .then((dataPhotos) => {
//       allData.photos = dataPhotos;
//     })
//     .then(() => {
//       res.status(200).send(allData);
//     })
//     .catch(() => {
//       res.status(500).send('error in getting the data from the db');
//     });
// });

app.get('/restaurants/:id', (req, res) => {
  console.log('app.get is firing');
  pg.fetchRestaurants(req.params.id)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(() => res.status(500).send('An error occurred'));
});



// Update
// app.put('api/restaurants/:id', (req, res) => {
//   db.updateRestaurant(req.params.id, req.body)
//   .then(() => {
//     res.status(202)
//   })
//   .catch(() => {
//     res.status(500)
//   })
// })

// Delete
// app.delete('/restaurants/:id', (req, res) => {
//   db.deletePhotos(req.params.id)
//     .then(() => {
//       db.deleteRestaurant(req.params.id)
//         .then(() => {
//           res.status(202)
//         })
//     })
//     .catch(() => {
//       res.status(500)
//     })
// })



app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
