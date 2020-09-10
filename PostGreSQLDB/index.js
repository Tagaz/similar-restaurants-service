// const { Client } = require('pg');

// const connectionString = 'postgres://blakejones@localhost/zagatsimilarrestaurants';

// const client = new Client({connectionString});

// client.connect();

// const getTitle = (title) => {
//   console.time('PSQL Query Time');
//   const query = `SELECT name, category, neighborhood FROM restaurants WHERE rid = ${title};`;
//   return new Promise((resolve, reject) => {
//     client.query(query, (err, data) => {
//       if (err) {
//         console.timeEnd('PSQL Query Time');
//         reject(err.message);
//       }
//       resolve(data.rows);
//       console.timeEnd('PSQL Query Time');
//     });
//   });
// };

// // Given a category and a neighborhood, populate the grid with max 6 cards.
// // With similar (same category) restaurants nearby (same neighborhood).
// const getSimilar = (catNeighId) => {
//   console.time('PSQL Getting Similar');
//   const cat = catNeighId[0];
//   const neigh = catNeighId[1];
//   const neighSpl = neigh.split('/');
//   const firstHalf = neighSpl[0] + '%';
//   const rid = catNeighId[2];
//   const query = `SELECT * FROM restaurants WHERE category = '${cat}' AND neighborhood LIKE '${firstHalf}' AND rid != ${rid} LIMIT 6`;
//   return new Promise((resolve, reject) => {
//     client.query(query, (err, data) => {
//       if (err) {
//         console.timeEnd('PSQL Getting Similar');
//         reject(err.message);
//       }
//       console.timeEnd('PSQL Getting Similar');
//       resolve(data);
//     });
//   });
// };

// // Given a restaurant id, for each card, populate their photos.
// const getPhotos = (args) => {
//   console.time('Getting Photos');
//   const query = `SELECT photos FROM restaurants WHERE rid = ${args};`;
//   return new Promise((resolve, reject) => {
//     client.query(query, (err, data) => {
//       if (err) {
//         console.timeEnd('Getting Photos');
//         reject(err.message);
//       }
//       console.timeEnd('Getting Photos');
//       resolve(data);
//     });
//   });
// };

// module.exports = {
//   client,
//   getTitle,
//   getSimilar,
//   getPhotos,
// };