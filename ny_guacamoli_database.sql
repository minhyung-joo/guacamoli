DROP TABLE if exists meal cascade;
DROP TABLE if exists restaurant cascade;
DROP TABLE if exists cuisineType cascade;
DROP TABLE if exists deliverySpeed cascade;
DROP TABLE if exists offeredTime cascade;
DROP TABLE if exists ingredient cascade;
DROP TABLE if exists sauceType cascade;
DROP TABLE if exists tasteType cascade;

/*
  enums
*/
CREATE TABLE restaurant (
  id smallint,
  restaurant text
);

CREATE TABLE cuisineType (
  id smallint,
  cuisineType text
);

CREATE TABLE deliverySpeed (
  id smallint,
  deliverySpeed text
);

CREATE TABLE offeredTime (
  id smallint,
  offeredTime text
);

CREATE TABLE ingredient (
  id smallint,
  ingredient text
);

CREATE TABLE sauceType (
  id smallint,
  sauceType text
);

CREATE TABLE tasteType (
  id smallint,
  tasteType text
);

/*
  main
*/
CREATE TABLE meal (
  id serial primary key,

  -- essentials
  name text,
  chineseName text,
  category text,

  restaurantId smallint,  -- single -- GRB, Milano, etc
  price decimal(8,2),
  picture_url text,

  -- relational, one to one
  cuisineTypeId smallint,
  deliverySpeedId smallint, -- 1: instant, 2: ticketed

  -- relational, one to many
  offeredTimesId smallint[],
  tasteTypesId smallint[],
  ingredientTypesId smallint[],
  sauceTypesId smallint[],
  ingredientsDescription text,
  nutritionInformation text,

  -- updatable
  rating integer,
  rating_count integer,
  comments text[]
);
