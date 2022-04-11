/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  router.get("/", (req, res) => {
    res.send('hello');
    database.getAllArtist()
      .then(users => {
        console.log("USERS:",users);
        res.json({ users });
      })
      .catch(err => {
        //console.error(err);
        //res.send(err);
      });
  });
  
  router.get('/artists/:id', (req, res) => {
    console.log(`incoming ${req.params.id}`);
    database.filterByArtist(req.params.id)
    .then(artists => res.send({artists}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });
  return router;
};


  

