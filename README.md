# Zigat.com similar restaurants module
> This module shows similar restaurants to the one displayed on a page by category and neighborhood. It's rendered at the bottom of the page above the footer.

## Related Projects
  - https://github.com/FEC-7-Stevens/photo-carousel-service
  - https://github.com/FEC-7-Stevens/info-sidebar-service
  - https://github.com/FEC-7-Stevens/tips-recommendations-service

## Table of Contents
1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [Development](#Development)
4. [Screenshots](#Screenshots)

## Usage
> Example URL: http://localhost:3004/2/

To initialize the page, in two separate terminal windows:

```sh
npm start
npm run build
```

```sh
CRUD API CALLS: 
Create - app.post('/restaurants/') 
Read - app.get('/restaurant/:id')
Update - app.put('/restaurants/:id')
Delete - app.delete('/restaurnats/:id')
```

Create - creates a new restaurant with the supplied information
Read - will grab an array with all of the information for that id
Update - will update the restaurant at that id with the new information
Delete - deletes the restaurant at that id


If there are no similar restaurants the module doesn't render.

## Requirements
- Node v12.18.1
  - https://nodejs.org/
- MySQL v5.7.31
  - https://dev.mysql.com/

## Development

### Installing Dependencies
From within this repository's root directory:
```sh
npm install
```

### Database Creation and Seeding
First create the schema, then add 700 restaurants data with relative photos.
```sh
npm run schema
npm run seed
```

### Development Enviroment
In two separate terminal windows:
```sh
npm run start:dev
npm run build:dev
```

### Testing
Using Jest and Enzyme.
```sh
npm test
```

## Screenshots

### Full grid of six

![Alt ](/screenshots/similar-grid-6.png?raw=true "Similar restaurants full grid of six")

### Grid of four

![Alt ](/screenshots/similar-grid-4.png?raw=true "Similar restaurants grid of four")

### Grid of two

![Alt ](/screenshots/similar-grid-2.png?raw=true "Similar restaurants grid of two")

### One restaurant has no photos
A placeholder image is rendered.

![Alt ](/screenshots/similar-with-exception.png?raw=true "One restaurant has no photos")
