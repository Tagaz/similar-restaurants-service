const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./data.csv');
console.time('Timer');

// writeStream.write('id, name, price, rating_label, rating_score, description, url_handle, category, neighborhood\n', 'utf8');

function writeTenMillRest(writer, callback) {
  let i = 100;
  let id = 0;

  function write() {
    let ok = true;
    do {
      i -=1;
      id += 1;
      const firstName = faker.name.firstName();
      const color = faker.commerce.color();
      const word = faker.lorem.word();
      const name = faker.helpers.randomize([`${firstName} ${color} ${word}`, `${color} ${firstName} ${word}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`]);
      const price = faker.helpers.randomize(['$', '$$', '$$$', '$$$$', '$$$$$']);
      const ratingLabel = faker.helpers.randomize(['Food', 'Decor', 'Service']);
      const ratingScore = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
      const description = faker.lorem.sentence();
      const urlHandle = faker.helpers.slugify(name);
      const category = faker.helpers.randomize(['Mexican', 'French', 'Italian', 'Californian', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian', 'German', 'Spanish', 'Pizza', 'Greek', 'Greek', 'Vegetarian', 'Vegan']);
      const neighborhood = faker.helpers.randomize(['Mission', 'Haight Ashbury', 'Hayes Valley', 'Castro', 'North Beach', 'Financial District', 'Financial District', 'Marina', 'Fillmore', 'Pacific Heights', 'Noe Valley']);
      const data = `id: ${i}, name: ${name}, price: ${price}, rating_label: ${ratingLabel}, rating_score: ${ratingScore}, description: ${description}, url_handle: ${urlHandle}, category: ${category}, neighborhood: ${neighborhood} \n`
      if (i === 0) {
        writer.write(data, callback)
      } else {
        ok = writer.write(data)
      }
    } while (i > 0 && ok);

    if (i > 0) {
        writer.write('drain', write);
    }
  }
  write()
}

writeTenMillRest(writeStream, () => {
  writeStream.end();
  console.timeEnd('Timer');
})

// for (let i = 1; i <= 10000000; i++) {
//   const firstName = faker.name.firstName();
//   const color = faker.commerce.color();
//   const word = faker.lorem.word();
//   const name = faker.helpers.randomize([`${firstName} ${color} ${word}`, `${color} ${firstName} ${word}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`]);
//   const price = faker.helpers.randomize(['$', '$$', '$$$', '$$$$', '$$$$$']);
//   const ratingLabel = faker.helpers.randomize(['Food', 'Decor', 'Service']);
//   const ratingScore = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
//   const description = faker.lorem.sentence();
//   const urlHandle = faker.helpers.slugify(name);
//   const category = faker.helpers.randomize(['Mexican', 'French', 'Italian', 'Californian', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian', 'German', 'Spanish', 'Pizza', 'Greek', 'Greek', 'Vegetarian', 'Vegan']);
//   const neighborhood = faker.helpers.randomize(['Mission', 'Haight Ashbury', 'Hayes Valley', 'Castro', 'North Beach', 'Financial District', 'Financial District', 'Marina', 'Fillmore', 'Pacific Heights', 'Noe Valley']);
//   writeStream.write(
//     `id: ${i},
//     name: ${name},
//     price: ${price},
//     rating_label: ${ratingLabel},
//     rating_score: ${ratingScore},
//     description: ${description},
//     url_handle: ${urlHandle},
//     category: ${category},
//     neighborhood: ${neighborhood} \n`
//   );
// }

// // if (i <= 10000000) {
// //   writeStream.once('drain', write);
// // }

writeStream.on('finish', () => {
  console.log('finished')
})

// writeStream.end();
// console.timeEnd('Timer');
