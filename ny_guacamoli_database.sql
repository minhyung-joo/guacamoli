DROP TABLE if exists meal cascade;

DROP TABLE if exists restaurantNameInfo cascade;
DROP TABLE if exists tasteTypeInfo cascade;
DROP TABLE if exists foodTypeInfo cascade;
DROP TABLE if exists cuisineTypeInfo cascade;
DROP TABLE if exists tasteTypeInfo cascade;
DROP TABLE if exists foodTypeInfo cascade;
DROP TABLE if exists cuisineTypeInfo cascade;
DROP TABLE if exists tastes cascade;
DROP TABLE if exists foodTypes cascade;

CREATE TABLE meal (
  id serial primary key,
  location text,  -- ie. lg1, lg7, etc
  restaurantNameId smallint,  --single -- GRB, Milano, etc
  name text,
  price decimal(8,2),
  picture_url text,
  health_detail_url text, --healthDetail screencapture

  -- enum stuff
  deliverySpeed smallint,
  offeredTimes smallint[], -- multiple

  -- many-to-many relationship,
  -- do we need tasteType field in this table??
  --tasteTypeInfoId smallint, -- multiple
  --foodTypeInfoId smallint, -- multiple
  cuisineTypeId smallint, -- single

  -- user-can-update stuff
  rating integer,
  comments text[]
);

-- as enum
CREATE TABLE restaurantNameInfo (
  id smallint,
  name text
);

-- as enum
CREATE TABLE tasteTypeInfo (
  id smallint,
  tasteType text
);

-- as enum
CREATE TABLE foodTypeInfo (
  id smallint,
  foodType text
);

CREATE TABLE cuisineTypeInfo (
  id smallint,
  cuisineType text
);

-- many to many
CREATE TABLE tastes (
  foodId integer,
  foodTasteId  smallint
);

-- many to many
CREATE TABLE foodTypes (
  foodId integer,
  foodTypeId  smallint
);

/*
CREATE TABLE cuisineIs (
  foodId integer,
  cuisineTypeId smallint
);
*/
