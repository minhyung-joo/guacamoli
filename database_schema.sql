DROP TABLE if exists test_table cascade;
DROP TABLE if exists meal cascade;


CREATE TABLE test_table (
  id serial primary key,
  name text
);

CREATE TABLE meal (
  id serial primary key,

  restaurant text,
  category text,
  name text,
  picture_url text,

  price real,

  offeredBreakfast boolean,
  offeredLunch boolean,
  offeredDinner boolean,

  rating integer,
  comments text[]
);
