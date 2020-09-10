const pgp = require('pg-promise')();
const { Client } = require('pg');

const connectionString = 'postgres://blakejones@localhost/zagatsimilarrestaurants';

// const client = new Client({connectionString});

// client.connect();

const db = pgp(connectionString);

const fetchRestaurants = (id) => {
  return new Promise((resolve, reject) => {
    db.many('SELECT restaurants.rid, restaurants.name, restaurants.price, restaurants.rating_score, restaurants.rating_label, restaurants.description, categories.c_name, neighborhoods.n_name, photos.url from restaurants INNER JOIN categories ON CAST (restaurants.category as INTEGER)= categories.cid INNER JOIN neighborhoods ON CAST (restaurants.neighborhood as INTEGER) = neighborhoods.nid LEFT JOIN photos ON CAST (photos.restaurant_id as INTEGER) = restaurants.rid where restaurants.category = (select category from restaurants where rid = $1) and restaurants.neighborhood = (select neighborhood from restaurants where rid = $1)', id)
      .then((data) => {
        const results = {
          restaurant: {},
          similar: [],
          photos: [],
        };
        console.log(data);
        const ridTracker = {};
        let counter = 0;

        data.forEach((item) => {
          if (item.rid === Number(id) && ridTracker[item.rid] === undefined) {
            ridTracker[item.rid] = true;
            results.restaurant.name = item.name;
            results.restaurant.category = item.c_name;
            results.restaurant.neighborhood = item.n_name;
          } else if (item.rid !== Number(id) && counter < 6) {
            if (ridTracker[item.rid] === undefined) {
              ridTracker[item.rid] = counter;
              counter++;
              const similarRestObj = {
                rid: item.rid,
                name: item.name,
                price: item.price,
                rating_label: item.rating_label,
                rating_score: item.rating_score,
                description: item.description,
                category: item.c_name,
                neighborhood: item.n_name,
              };
              results.similar.push(similarRestObj);
            }
            const photoObj = {
              url: item.url,
              restaurant_id: item.rid,
            };
            if (results.photos[ridTracker[item.rid]] === undefined) {
              results.photos[ridTracker[item.rid]] = [];
            }
            results.photos[ridTracker[item.rid]].push(photoObj);
          }
        });
        resolve(results);
      })
      .catch((err) => reject(err));
  });
};

/* const addRestaurant = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO restaurants (${keys[0]}, ${keys[1]}, ${keys[2]}, ${keys[3]}, ${keys[4]}, ${keys[5]}, ${keys[6]}, ${keys[7]}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, values, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};
const addPhoto = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO photos (${keys[0]}, ${keys[1]}) VALUES (?, ?)`, values, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};
const deleteRestaurant = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM restaurants WHERE rid = ${id}`, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};
const deletePhotos = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM photos WHERE restaurant_id = ?', [id], (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};
const updateRestaurant = (obj, id) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  let query = '';
  for (let i = 0; i < keys.length; i++) {
    if (query !== '') { query += ', '; }
    query += `${keys[i]} = "${values[i]}"`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE restaurants SET ${query} WHERE rid = ${id}`, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
}; */

module.exports = {
  db,
  fetchRestaurants,
};