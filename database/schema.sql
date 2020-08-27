DROP DATABASE IF EXISTS zagatSimilarRestaurants;

CREATE DATABASE zagatSimilarRestaurants;

USE zagatSimilarRestaurants;

CREATE TABLE restaurants (
  rid int AUTO_INCREMENT,
  name varchar(50),
  price varchar(5),
  rating_label varchar(10),
  rating_score varchar(3),
  description varchar(100),
  url_handle varchar(100) UNIQUE,
  category varchar(20),
  neighborhood varchar(20),
  PRIMARY KEY (rid)
);

CREATE TABLE photos (
  pid int AUTO_INCREMENT,
  url varchar(100),
  restaurant_id int,
  PRIMARY KEY (pid),
  FOREIGN KEY (restaurant_id)
      REFERENCES restaurants(rid)
);