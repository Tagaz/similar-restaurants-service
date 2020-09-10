const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('./data.csv');
const writeCatNeighStream = fs.createWriteStream('./catneighdata.csv');
console.time('Timer');
console.time('CatNeighTime');


// writeStream.write('id, name, price, rating_label, rating_score, description, url_handle, category, neighborhood\n', 'utf8');
const neighbor = ['Montrose', 'West Hollywood', 'The Castro', 'SoMa', 'Capitol Hill', 'Dupont Circle', 'Palm Springs', 'Hillcrest', 'Wilton Manors', 'Logan Circle', 'South Beach', 'Oak Lawn', 'Andersonville', 'Boystown', 'Saugatuck', 'Fruit Loop', 'Hell\'s Kitchen', 'Chelsea', 'Fire Island Pines', 'Cherry Grove', 'West Village', 'Greenwich Village', 'Midtown', 'Travis Heights'];

for (var j = 0; j < 50000; j++) {
  if (j % 11 === 0) {
    const name = `${faker.commerce.color()}${faker.address.citySuffix()}`;
    const capital = name.charAt(0).toUpperCase() + name.slice(1);
    neighbor.push(`${capital} ${faker.address.country()}`);
  } else if (j % 7 === 0) {
    const word = `${faker.random.word()}`
    const capWord = word.charAt(0).toUpperCase() + word.slice(1);
    neighbor.push(`${faker.address.cityPrefix()} ${capWord} ${faker.address.country()}`);
  } else if (j % 5 === 0) {
    neighbor.push(`${faker.address.streetName()}  ${faker.address.country()}`);
  } else if (j % 3 === 0) {
    neighbor.push(`${faker.name.lastName()} ${faker.address.streetSuffix()} ${faker.address.state()}`);
  } else if (j % 2 === 0) {
    const color = `${faker.commerce.color()}`;
    const colorCap = color.charAt(0).toUpperCase() + color.slice(1);
    neighbor.push(`${colorCap} ${faker.address.city()}  ${faker.address.country()}`);
  } else {
    neighbor.push(`${faker.address.city()} ${faker.address.county()} ${faker.address.state()}`);
  }
}

const categories = faker.helpers.randomize(['Mexican', 'French', 'Italian', 'Californian', 'Japanese', 'Chinese', 'Thai', 'Vietnamese', 'Indian', 'German', 'Spanish', 'Pizza', 'Greek', 'Seafood', 'Vegetarian', 'Vegan', 'Soul Food', 'Ethiopian', 'Moroccan', 'American', 'Mediterranean', 'Tex-Mex', 'Polish', 'Native American', 'Nepalese', 'Malay', 'Cajun', 'Korean', 'Laotian', 'Kosher', 'Jamaican', 'Irish', 'Danish', 'British', 'Breakfast', 'Caribbean', 'Asian Fusion', 'Bakery', 'Dessert', 'Dim Sum', 'Fast Food', 'Filipino', 'Delis', 'Halal', 'Ice Cream', 'Latin American', 'Lebanese', 'Malaysian', 'South American', 'Pakistani', 'Salad', 'Persian', 'Sushi', 'Barbecue', 'Contemporary', 'Tapas', 'Scandanavian', 'Smoothies', 'Brazilian', 'Russian', 'Taiwanese', 'Turkish']);


console.log(categories.length * neighbor.length, 'this is category.length times neighbor.length')
function writeTenMillRest(writer, callback) {
  let i = 100;
  let rid = 0;
  function write() {
    let ok = true;
    let ok1 = true;
    do {
      i -= 1;
      rid += 1;
      const firstName = faker.name.firstName();
      const color = faker.commerce.color();
      const word = faker.lorem.word();
      const name = faker.helpers.randomize([`${firstName} ${color} ${word}`, `${color} ${firstName} ${word}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`, `${word} ${color} ${firstName}`]);
      const price = faker.helpers.randomize(['$', '$$', '$$$', '$$$$', '$$$$$']);
      const ratingLabel = faker.helpers.randomize(['Food', 'Decor', 'Service']);
      const ratingScore = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
      const description = faker.lorem.sentence();
      const urlHandle = faker.helpers.slugify(name);
      const category = faker.helpers.randomize(categories);
      const neighborhood = faker.helpers.randomize(neighbor);
      const catNeighId = '';
      for (var m = 0; m < catAndNeigh.length; m++) {
        if (neighborhood === catAndNeigh[m][1] && category === catAndNeigh[m][2]) {
          catNeighId = catAndNeigh[m][0];
          catAndNeigh[m][3].push(rid);
          break;
        }
      }
      const photo = [];
      var randomNum = Math.floor(Math.random() * (4) + 2)
      for (var k = 0; k <= randomNum; k++) {
        var imageId = Math.floor(Math.random() * (750 - 1) + 1);
        var numString = imageId.toString();
        let finalId = numString.padStart(4, '0');
        photo.push(finalId);
      }
      const photos = photo;
      const data = `${name};${price};${ratingLabel};${ratingScore};${description};${urlHandle};${photos}\n`
      if (i === 0) {
        writer.write(catNeighId)
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


function writeCatAndNeigh(writer, callback) {
  let q = 0;

  function writeCats() {
    let ok = true;
    let ok1 = true;
    do {
      const neigh = catAndNeigh[q][1];
      const cat = catAndNeigh[q][2];
      const restaurants = catAndNeigh[q][3];
      const catNeighData = `${neigh};${cat};${restaurants}\n`
      if (q === catAndNeigh.length - 1) {
        writer.write(catNeighData, callback);
      } else {
        ok = writer.write(catNeighData);
      }
      q += 1;
    } while (q < catAndNeigh.length && ok);
    if (q < catAndNeigh.length) {
      writer.write('drain', writeCats);
    }
  }
  writeCats();
}

writeTenMillRest(writeStream, () => {
  writeStream.end();
  console.timeEnd('Timer');
});

writeCatAndNeigh(writeCatNeighStream, () => {
  writeCatNeighStream.end();
  console.timeEnd('CatNeighTime');
});

writeStream.on('finish', () => {
  console.log('finished')
});

writeCatNeighStream.on('finish', () => {
  console.log('Photos finished')
});