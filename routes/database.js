
const { Pool } = require("pg");
const dbParams = require('../lib/db.js')
const pool = new Pool(dbParams);
//pool.connect();
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const filterByArtist = (options, limit = 10) => {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
    SELECT artist.*
    FROM artists
    JOIN users ON artists.id = artist_id
    `;
  // 3
  if (options.artist_id === 1) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  // 4
  queryParams.push(limit);
  queryString += `
    LIMIT $${queryParams.length};
    `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
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