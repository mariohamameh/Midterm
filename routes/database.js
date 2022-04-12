
const { Pool } = require("pg");
const dbParams = require('../lib/db.js')
const pool = new Pool(dbParams);
//pool.connect();
/**
 * Get all properties.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const filterByArtist = (id) => {
  console.log(`FilterbyArtist is RUNNING,${id}`);
  let queryString = `
  SELECT *
  FROM artists
  `
  if (id == 1) {
    queryString += `WHERE id = 1;`;
  }
  if (id == 2) {
    queryString += `WHERE id = 2;`;
  }
  if (id == 3) {
    queryString += `WHERE id = 3;`;
  }
  if (id == 4) {
    queryString += `WHERE id = 4;`;
  }
  if (id == 5) {
    queryString += `WHERE id = 5;`;
  }
  console.log(`query is: ${queryString}`);
  return pool.query(queryString).then((res) => {return res.rows});
};

exports.filterByArtist = filterByArtist;

const getAllArtist=()=>{

  return pool.query(`SELECT * FROM users;`)
  .then(res => {
    return res.rows;
  })
  .catch(error =>{
    console.log(error);
  });
}
exports.getAllArtist = getAllArtist;

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

exports.getFavouritesForUser = getFavouritesForUser
