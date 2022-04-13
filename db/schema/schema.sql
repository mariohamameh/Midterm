DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL
  -- is_admin BOOLEAN NOT NULL DEFAULT FALSE -> how to distinguish users vs admins
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  seller_id INTEGER REFERENCES users(id) NOT NULL,
  artist VARCHAR(100) NOT NULL,
  artist_bio TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  -- category_id INTEGER REFERENCES artists(id) NOT NULL -> potentially added if category filter is added
  date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  item_id INTEGER REFERENCES items(id) NOT NULL
);

DROP TABLE IF EXISTS conversations CASCADE;
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  from_user INTEGER REFERENCES users(id) NOT NULL,
  item_id INTEGER REFERENCES items(id) NOT NULL,
  conversation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id INTEGER REFERENCES conversations(id) NOT NULL,
  from_buyer BOOLEAN NOT NULL DEFAULT TRUE,
  message TEXT NOT NULL,
  message_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- CREATE TABLE conversations (
--   id SERIAL PRIMARY KEY NOT NULL,
--   from_user INTEGER REFERENCES users(id) NOT NULL,
--   item_id INTEGER REFERENCES items(id) NOT NULL
-- );

-- CREATE TABLE messages (
--   id SERIAL PRIMARY KEY NOT NULL,
--   conversation_id INTEGER REFERENCES conversations(id) NOT NULL,
--   from_buyer BOOLEAN NOT NULL DEFAULT TRUE,
--   content VARCHAR(255) NOT NULL
-- );

GRANT ALL PRIVILEGES ON DATABASE midterm TO labber;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
ALTER TABLE users OWNER TO labber;
ALTER TABLE favourites OWNER TO labber;
ALTER TABLE items OWNER TO labber;
ALTER TABLE conversations OWNER TO labber;
