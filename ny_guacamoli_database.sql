DROP TABLE if exists meal cascade;
DROP TABLE if exists restaurant cascade;
DROP TABLE if exists cuisineType cascade;
DROP TABLE if exists deliverySpeed cascade;
DROP TABLE if exists offeredTime cascade;
DROP TABLE if exists foodType cascade;
DROP TABLE if exists sauceType cascade;

/*
  enums
*/
CREATE TABLE restaurant (
  id smallint,
  value text
);

CREATE TABLE cuisineType (
  id smallint,
  value text
);

CREATE TABLE deliverySpeed (
  id smallint,
  value text
);

CREATE TABLE offeredTime (
  id smallint,
  value text
);

CREATE TABLE foodType (
  id smallint,
  value text
);

CREATE TABLE sauceType (
  id smallint,
  value text
);


/*
  main
*/
CREATE TABLE meal (
  id serial primary key,

  -- essentials
  name text,
  restaurantId integer,  --single -- GRB, Milano, etc
  price decimal(8,2),
  picture_url text,

  -- relational, one to one
  cuisineTypeId smallint,
  deliverySpeedId smallint, -- 1: instant, 2: ticketed

  -- relational, one to many
  offeredTimesId smallint[],
  tasteTypesId smallint[],
  foodTypesId smallint[],
  sauceTypesId smallint[],

  -- updatable
  rating integer[],
  comments text[]
);
