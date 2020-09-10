DROP DATABASE IF EXISTS zagatSimilarRestaurants;

CREATE DATABASE zagatSimilarRestaurants;

CREATE TABLE restaurants (
  rid SERIAL PRIMARY KEY,
  name VARCHAR(50),
  price VARCHAR(5),
  rating_label VARCHAR(10),
  rating_score VARCHAR(3),
  descriptions VARCHAR(100),
  url_handle VARCHAR(100) UNIQUE,
  category VARCHAR(20),
  neighborhood VARCHAR(20)
);

CREATE TABLE photos (
  pid SERIAL,
  url VARCHAR(100),
  restaurant_id INT,
  PRIMARY KEY (pid),
  FOREIGN KEY (restaurant_id)
    REFERENCES restaurants(rid)
);