const mysql = require('mysql');
const dbConfig = require('./dbconfig.js');

const connection = mysql.createConnection(dbConfig);

connection.connect();

const seedDataRestaurants = (name, price, ratingLabel, ratingScore,
  description, urlHandle, category, neighborhood) => {
  const query = `INSERT INTO restaurants (name, price, rating_label, rating_score, description, url_handle, category, neighborhood) VALUES ("${name}", "${price}", "${ratingLabel}", "${ratingScore}", "${description}", "${urlHandle}", "${category}", "${neighborhood}");`;
  connection.query(query, (err, success) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      // eslint-disable-next-line no-console
      console.log(success);
    }
  });
};

const seedDataPhotos = (url, restaurantId) => {
  const query = `INSERT INTO photos (url, restaurant_id) VALUES ("${url}", ${restaurantId});`;
  connection.query(query, (err, success) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      // eslint-disable-next-line no-console
      console.log(success);
    }
  });
};

// Update one record to have consistency across all our services
const updateOne = () => {
  const query = `UPDATE restaurants SET name = "Stevens' Kitchen", category = "Greek", neighborhood = "Financial District" WHERE rid = 1;`;
  connection.query(query, (err, success) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      // eslint-disable-next-line no-console
      console.log(success);
    }
  });
}

// Given a restaurant id, populate name, category, and neighborhood in title.
const getTitle = (args) => {
  const query = 'SELECT name, category, neighborhood FROM restaurants WHERE rid = ?;';
  return new Promise((resolve, reject) => {
    connection.query(query, args, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

// Given a category and a neighborhood, populate the grid with max 6 cards.
// With similar (same category) restaurants nearby (same neighborhood).
const getSimilar = (args) => {
  const query = 'SELECT DISTINCT rid, name, price, rating_label, rating_score, description, category, neighborhood FROM restaurants WHERE category = ? AND neighborhood = ? AND rid != ? LIMIT 6;';
  return new Promise((resolve, reject) => {
    connection.query(query, args, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

// Given a restaurant id, for each card, populate their photos.
const getPhotos = (args) => {
  const query = 'SELECT url, restaurant_id FROM photos WHERE restaurant_id = ?;';
  return new Promise((resolve, reject) => {
    connection.query(query, args, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

const createRestaurant = (args) => {
  const columns = Object.keys(args);
  console.log(args, columns, 'these are the columns and the args')
  const values = Object.values(args);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO restaurants (${columns[0]}, ${columns[1]}, ${columns[2]}, ${columns[3]}, ${columns[4]}, ${columns[5]}, ${columns[6]}, ${columns[7]}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, values, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
}

const updateRestaurant = (id, args) => {
  const columns = Object.keys(args);
  const values = Object.values(args);
  const queryStr = '';

  for (var i = 0; i < columns.length; i++) {
    if (queryStr !== '') {
      queryStr += ', ';
    }
    queryStr += `${columns[i]} = '${values[i]}'`
  }

  const query = `UPDATE restaurants SET ${queryStr} WHERE rid = ${id}`;

  return new Promise((resolve, reject) => {
    connection.query(`UPDATE restaurants SET ${query} WHERE rid = ${id}`, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });

}

const deleteRestaurant = (id) => {
  const query = `DELETE FROM restaurants WHERE id = ${id}`;
  connection.query(query, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  })
}

const deletePhotos = (id) => {
  const query = `DELETE FROM photos WHERE restaurant_id = ${id}`;
  connection.query(query, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  })
}

module.exports = {
  connection,
  seedDataRestaurants,
  seedDataPhotos,
  updateOne,
  getTitle,
  getSimilar,
  getPhotos,
  deleteRestaurant,
  createRestaurant,
  updateRestaurant,
  deletePhotos,
};
