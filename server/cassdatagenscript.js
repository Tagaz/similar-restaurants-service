const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./cassdata.csv');
const writeNeighStream = fs.createWriteStream('./cassneighdata.csv');
console.time('Timer');


// writeStream.write('id, name, price, rating_label, rating_score, description, url_handle, category, neighborhood\n', 'utf8');
const neighbor = ['Montrose', 'West Hollywood', 'The Castro', 'SoMa', 'Capitol Hill', 'Dupont Circle', 'Palm Springs', 'Hillcrest', 'Wilton Manors', 'Logan Circle', 'South Beach', 'Oak Lawn', 'Andersonville', 'Boystown', 'Saugatuck', 'Fruit Loop', 'Hell\'s Kitchen', 'Chelsea', 'Fire Island Pines', 'Cherry Grove', 'West Village', 'Greenwich Village', 'Midtown', 'Travis Heights'];

for (var j = 0; j < 60000; j++) {
  if (j % 11 === 0) {
    const name = `${faker.commerce.color()}${faker.address.citySuffix()}`;
    const capital = name.charAt(0).toUpperCase() + name.slice(1);
    neighbor.push(`${capital}/ ${faker.address.country()}`);
  } else if (j % 7 === 0) {
    const word = `${faker.random.word()}`
    const capWord = word.charAt(0).toUpperCase() + word.slice(1);
    neighbor.push(`${faker.address.cityPrefix()} ${capWord}/ ${faker.address.country()}`);
  } else if (j % 5 === 0) {
    neighbor.push(`${faker.address.streetName()}/  ${faker.address.country()}`);
  } else if (j % 3 === 0) {
    neighbor.push(`${faker.name.lastName()} ${faker.address.streetSuffix()}/ ${faker.address.state()}`);
  } else if (j % 2 === 0) {
    const color = `${faker.commerce.color()}`;
    const colorCap = color.charAt(0).toUpperCase() + color.slice(1);
    neighbor.push(`${colorCap} ${faker.address.city()}/  ${faker.address.country()}`);
  } else {
    neighbor.push(`${faker.address.city()} ${faker.address.county()}/ ${faker.address.state()}`);
  }
}

function writeTenMill(writer, neighWriter, callback) {
  let i = 10000001;

  function write() {
    let ok1 = true;
    let ok2 = true;
    do {
      i -=1;
      let photos = '[';
      const photoNum = Math.floor((Math.random() * 6) + 1);
      for (let x = 0; x < photoNum; x++) {
        if (photos !== '[') {photos += ','; }
        const imageId = Math.floor(Math.random() * (750 - 1) + 1);
        const numString = imageId.toString();
        let finalId = numString.padStart(4, '0')
        photos += `https://tagaz-similar-restaurant-service.s3.us-east-2.amazonaws.com/FEC_photos/${finalId}.jpg`;
        if (x === photoNum - 1) {photos += ']'; }
      }
      const firstName = faker.name.firstName();
      const color = faker.commerce.color();
      const word = faker.lorem.word();
      const name = faker.helpers.randomize([`${firstName} ${color} ${word}`, `${color} ${firstName} ${word}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`]);
      const price = faker.helpers.randomize(['$', '$$', '$$$', '$$$$', '$$$$$']);
      const ratingLabel = faker.helpers.randomize(['Food', 'Decor', 'Service']);
      const ratingScore = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
      const description = faker.lorem.sentence();
      const urlHandle = faker.helpers.slugify(name);
      const category = faker.helpers.randomize(['Mexican', 'French', 'Italian', 'Californian', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian', 'German', 'Spanish', 'Pizza', 'Greek', 'Seafood', 'Vegetarian', 'Vegan', 'Soul Food', 'Ethiopian', 'Moroccan', 'American', 'Mediterranean', 'Tex-Mex', 'Polish', 'Native American', 'Nepalese', 'Malay', 'Cajun', 'Korean', 'Laotian', 'Kosher', 'Jamaican', 'Irish', 'Danish', 'British', 'Breakfast', 'Caribbean', 'Asian Fusion', 'Bakery', 'Dessert', 'Dim Sum', 'Fast Food', 'Filipino', 'Delis', 'Halal', 'Ice Cream', 'Latin American', 'Lebanese', 'Malaysian', 'South American', 'Pakistani', 'Salad', 'Persian', 'Sushi', 'Barbecue', 'Contemporary', 'Tapas', 'Scandanavian', 'Smoothies', 'Brazilian', 'Russian', 'Taiwanese', 'Turkish']);
      const neighborhood = faker.helpers.randomize(neighbor)
      let restEntry = `${i}|${name}|${category}|${neighborhood}|${urlHandle}|${photos}\n`;
      let neighEntry = `${neighborhood}|${i}|${category}|${price}|${ratingLabel}|${ratingScore}|${description}\n`;
      if (i === 0) {
        neighWriter.write(neighEntry, 'utf8')
        writer.write(restEntry, 'utf8', callback)
      } else {
        ok1 = writer.write(restEntry, 'utf8')
        ok2 = neighWriter.write(neighEntry, 'utf8')
      }
    } while (i > 0 && ok1 && ok2);

    if (i > 0) {
      if (!ok1 && !ok2) {
        writer.once('drain', () => neighWriter.once('drain', write))
      } else if (!ok1) {
        writer.once('drain', write);
      } else if (!ok2) {
        neighWriter.once('drain', write);
      }
    }
  }
  write()
}

writeTenMill(writeStream, writeNeighStream, () => {
  writeStream.end();
  console.timeEnd('Timer');
});

writeStream.on('finish', () => {
  console.log('finished')
});
