/* eslint-disable */
const mysql = require('mysql');
const dbConfig = require('../database/dbconfig.js');
const db = require('../database/index.js');

describe('Database seeding and retrieval ', () => {
  const connection = mysql.createConnection(dbConfig);

  beforeEach(() => {
    connection.connect();
    db.seedDataRestaurants('Test Restaurant', '$$', 'Food', '3.9',
      'This is the best place ever.', 'test-restaurant', 'Italian', 'Haight Ashbury');
  });

  const deleteOneRestaurant = () => {
    const query = `DELETE FROM restaurants WHERE name = "Test Restaurant";`;
    connection.query(query, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        console.log(success);
      }
    });
  };

  afterEach(() => {
    deleteOneRestaurant();
    connection.end();
  });

  const fetchData = () => {
    const query = 'SELECT * FROM restaurants WHERE name = "Test Restaurant";';
    return new Promise((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  };

  it('should insert data correctly into the database', () => {
    return fetchData()
    .then(data => {
      expect(data[0].lenght).toEqual(1);
    });
  });

});



