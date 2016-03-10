DROP TABLE if exists meal cascade;

DROP TABLE if exists tasteTypeInfo cascade;
DROP TABLE if exists foodTypeInfo cascade;
DROP TABLE if exists cuisineTypeInfo cascade;
DROP TABLE if exists tastes cascade;
DROP TABLE if exists typeIs cascade;
DROP TABLE if exists cuisineIs cascade;

CREATE TABLE meal (
  id serial primary key,
  location text,  -- ie. lg1, lg7, etc
  restaurant_name text,  -- GRB, Milano, etc
  name text,
  price decimal(8,2),
  picture_url text,
  health_detail_url text, --healthDetail screencapture

  -- enum stuff
  deliverySpeed smallint,
  offeredTime smallint,

  -- many-to-many relationship
  tasteTypeInfoId smallint,
  foodTypeInfoId smallint,
  cuisineTypeId smallint,

  -- user-can-update stuff
  rating integer,
  comments text[]
);

CREATE TABLE tasteTypeInfo (
  id serial primary key,
  tasteType text
);

CREATE TABLE foodTypeInfo (
  id serial primary key,
  foodType text
);

CREATE TABLE cuisineTypeInfo (
  id serial primary key,
  cuisineType text
);

CREATE TABLE tastes (
  foodId smallint,
  foodTasteId  smallint
);

CREATE TABLE typeIs (
  id serial primary key,
  foodId smallint,
  foodTypeId  smallint
);

CREATE TABLE cuisineIs (
  id serial primary key,
  foodId smallint,
  cuisineTypeId smallint
);
