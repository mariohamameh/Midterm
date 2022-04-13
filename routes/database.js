const { Pool } = require("pg");
const databaseParams = require('../lib/database.js');
const pool = new Pool(databaseParams);
//pool.connect();
/**
 * Get all properties.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// ITEM RELATED FUNCTIONS
const createNewItem = function(item) {
  return pool.query(`
  INSERT INTO items (title, description, price, artist, artist_bio, picture_url, seller__id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [item.title, item.description, item.price, item.artist, item.artist_bio, item.picture_url, item.seller__id])
    .then(res => {
      return res.rows[0];
    })
    .catch(error => console.error('query error', error.stack));
};

const deleteItem = function(user__id, item_id) {
  return pool.query(`
  DELETE FROM items WHERE seller__id = $1 AND _id = $2;
  `, [user__id, item_id]);
};

const markItemAsSold = function(item_id) {
  return pool.query(`
  UPDATE Items
  SET isSold = TRUE
  WHERE _id = $1
  `, [item_id]);
};

const favouriteItem = function(user__id, item_id) {
  return pool.query(`
  INSERT INTO favourites (user__id, item__id)
  VALUES ($1, $2)
  RETURNING *;
  `, [user__id, item_id]);
};

const unfavourite = function(user__id, item_id) {
  return pool.query(`
  DELETE FROM favourites WHERE user__id = $1 AND item__id = $2;
  `, [user__id, item_id])
    .then(() => {
      console.log("Deleted!");
    })
    .catch(error => console.error('query error', error.stack));
};



//GENERAL FUNCTIONS

const getAllUsers = ()=>{
  return pool.query(`SELECT * FROM users;`)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(error => console.error('query error', error.stack));
};

const getFavouritesForUser = function(user__id) {
  return pool.query(`
  SELECT * FROM items
  JOIN favourites ON favourites.item__id = items._id
  WHERE user__id = $1;
  `, [user__id])
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const getUsersItems = function(user__id) {
  return pool.query(`
  SELECT * FROM items
  WHERE seller__id = $1;
  `, [user__id])
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const getAllItems = function(user__id) {
  const itemsQuery = pool.query(`
  SELECT items.*, users.email
  FROM items
  JOIN users ON users._id = seller__id;`);
  const favouritesQuery =  pool.query(
    `SELECT *
    FROM favourites
    WHERE user__id = $1;`, [user__id]);
  return Promise.all([itemsQuery, favouritesQuery])
    .then(res => {
      const items = res[0].rows;
      const favourites = res[1].rows;
      for (const favourite of favourites) {
        const foundItems = items.find(items => {
          return items._id === favourite.items__id;
        });
        foundItems.isFavourite = true;
      }
      return items;
    })
    .catch(error => console.error('query error', error.stack));
};

const isItemFavourited = function(user__id, item_id) {
  return pool.query(`
  SELECT EXISTS (SELECT 1 FROM favourites
  WHERE user__id = $1 AND item__id = $2);`, [user__id, item_id])
    .then(res => {
      return res.rows;
    }).catch(error => console.error('query error', error.stack));
};

//// Search functions through filter

const searchByMaxPrice = function(price, orderBy) {
  let queryString = `SELECT * FROM items WHERE price <= $1 ORDER BY;`;
  queryString += orderBy;
  const values = [price];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const searchByMinPrice = function(price, orderBy) {
  let queryString = `SELECT * FROM items WHERE price >= $1 ORDER BY;`;
  queryString += orderBy;
  const values = [price];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const searchByTitle = function(title, orderBy) {
  let queryString = `SELECT * FROM items WHERE title LIKE $1 ORDER BY;`;
  queryString += orderBy;
  const values = [`%${title}%`];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const searchByArtist = function(artist, orderBy) {
  let queryString = `SELECT * FROM items WHERE artist LIKE $1 ORDER BY;`;
  queryString += orderBy;
  const values = [`%${artist}`];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

//// MESSAGES
const getMessagesforUser = function(user_id) {
  return pool.query(
    `SELECT *
    FROM conversations
    WHERE from_user = $1;`, [user_id])
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

const getMessagesForConversation = function(conversation_id) {
  return pool.query(
    `SELECT *
    FROM messages
    WHERE conversation_id = $1;`, [conversation_id])
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};


const sendMessage = (message) => {
const values = [
    message.from_user,
    message.item_id,
    message.message,
    message.conversation_id,
    message.from_buyer
  ];
  let queryString = `
  INSERT INTO conversations (from_user, item__id)
  VALUES ($1, $2)
  INSERT INTO messages (message, conversation_id, from_buyer)
  VALUES ($3, $4, $5)
  RETURNING *;`;
  return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(error => console.error('query error', error.stack));
};

exports.createNewItem = createNewItem;
exports.deleteItem = deleteItem;
exports.markItemAsSold = markItemAsSold;
exports.favouriteItem = favouriteItem;
exports.unfavourite = unfavourite;

exports.getAllUsers = getAllUsers;
exports.getUserWithEmail = getUserWithEmail;
exports.getFavouritesForUser = getFavouritesForUser;
exports.getUsersItems = getUsersItems;
exports.getAllItems = getAllItems;
exports.isItemFavourited = isItemFavourited;

exports.searchByMaxPrice = searchByMaxPrice;
exports.searchByMinPrice = searchByMinPrice;
exports.searchByTitle = searchByTitle;
exports.searchByArtist = searchByArtist;

exports.getMessagesforUser = getMessagesforUser;
exports.getMessagesForConversation = getMessagesForConversation;
exports.sendMessage = sendMessage;


//////// OLDER CODE BASE ////////////////
// const filterByArtist = (_id) => {
//   console.log(`FilterbyArtist is RUNNING,${_id}`);
//   let queryString = `
//   SELECT *
//   FROM artists
//   `
//   if (_id == 1) {
//     queryString += `WHERE _id = 1;`;
//   }
//   if (_id == 2) {
//     queryString += `WHERE _id = 2;`;
//   }
//   if (_id == 3) {
//     queryString += `WHERE _id = 3;`;
//   }
//   if (_id == 4) {
//     queryString += `WHERE _id = 4;`;
//   }
//   if (_id == 5) {
//     queryString += `WHERE _id = 5;`;
//   }
//   console.log(`query is: ${queryString}`);
//   return pool.query(queryString).then((res) => {return res.rows});
// };
// exports.filterByArtist = filterByArtist;

