const { Pool } = require("pg");
const dbParams = require('../lib/db.js')
const pool = new Pool(dbParams);
//pool.connect();
/**
 * Get all properties.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// ITEM RELATED FUNCTIONS
const createNewItem = function(item) {
  return pool.query(`
  INSERT INTO items (title, description, price, artist, artist_bio, picture_url, seller_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [item.title, item.description, item.price, item.artist, item.artist_bio, item.picture_url, item.seller_id])
  .then(res => {
    return res.rows[0];
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};

const deleteItem = function(userID, itemID) {
  return pool.query(`
  DELETE FROM items WHERE seller_id = $1 AND id = $2;
  `, [userID, itemID])
};

const markItemAsSold = function(itemID) {
  return pool.query(`
  UPDATE Items
  SET isSold = TRUE
  WHERE id = $1
  `, [itemID])
};

const favouriteItem = function(userID, itemID) {
  return pool.query(`
  INSERT INTO favourites (user_id, item_id)
  VALUES ($1, $2)
  RETURNING *;
  `, [userID, itemID])
};

const unfavourite = function(userID, itemID) {
  return pool.query(`
  DELETE FROM favourites WHERE user_id = $1 AND item_id = $2;
  `, [userID, itemID])
  .then(() => {
    console.log("Deleted!")
  })
  .catch((err) => {
    console.log("Error!", err)
  })
};





//GENERAL FUNCTIONS

const getAllUsers=()=>{

  return pool.query(`SELECT * FROM users;`)
  .then(res => {
    return res.rows;
  })
  .catch(error =>{
    console.log(error);
  });
}

const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;


const getFavouritesForUser = function(userID) {
  return pool.query(`
  SELECT * FROM items
  JOIN favourites ON favourites.item_id = items.id
  WHERE user_id = $1;
  `, [userID])
  .then(res => {
    console.log(res.rows);
    return res.rows;
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};

const isItemFavourited = function(userID, itemID) {
  return pool.query(`
  SELECT EXISTS (SELECT 1 FROM favourites
  WHERE user_id = $1 AND item_id = $2)`, [userID, itemID])
  .then(res => {
    return res.rows;
  }).catch(err => console.log(err));
}

//Search functions through filter

const searchByMaxPrice = function(bookPrice, orderBy) {
  let queryString = `SELECT * FROM items WHERE price <= $1 ORDER BY `
  queryString += orderBy
  const values = [bookPrice]
  return pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByMinPrice = function(bookPrice, orderBy) {
  let queryString = `SELECT * FROM items WHERE price >= $1 ORDER BY `
  queryString += orderBy
  const values = [bookPrice]
  return pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByTitle = function(bookTitle, orderBy) {
  let queryString = `SELECT * FROM items WHERE title LIKE $1 ORDER BY `
  queryString += orderBy
  const values = [`%${bookTitle}%`]
  return pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByArtist = function(itemArtist, orderBy) {
  let queryString = `SELECT * FROM items WHERE artist LIKE $1 ORDER BY `
  queryString += orderBy
  const values = [`%${itemArtist}`]
  return pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};



//////// OLDER CODE BASE ////////////////
// const filterByArtist = (id) => {
//   console.log(`FilterbyArtist is RUNNING,${id}`);
//   let queryString = `
//   SELECT *
//   FROM artists
//   `
//   if (id == 1) {
//     queryString += `WHERE id = 1;`;
//   }
//   if (id == 2) {
//     queryString += `WHERE id = 2;`;
//   }
//   if (id == 3) {
//     queryString += `WHERE id = 3;`;
//   }
//   if (id == 4) {
//     queryString += `WHERE id = 4;`;
//   }
//   if (id == 5) {
//     queryString += `WHERE id = 5;`;
//   }
//   console.log(`query is: ${queryString}`);
//   return pool.query(queryString).then((res) => {return res.rows});
// };
// exports.filterByArtist = filterByArtist;


exports.getAllUsers = getAllUsers;
exports.getFavouritesForUser = getFavouritesForUser;
exports.searchByMaxPrice = searchByMaxPrice;
exports.searchByMinPrice = searchByMinPrice;
exports.searchByTitle = searchByTitle;
exports.searchByArtist = searchByArtist;

