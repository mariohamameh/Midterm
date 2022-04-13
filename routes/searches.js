const express = require('express');
const router  = express.Router();

module.exports = (database) => {

  router.get("/main/search", (req, res) => {
    const searchText = req.query.searchText;
    const searchType = req.query.searchType;
    const searchOrder = req.query.searchOrder;

    let orderBy = "price";

    if (searchOrder === "highPrice") {
      orderBy = "price DESC";
    } else if (searchOrder === "lowPrice") {
      orderBy = "price";
    } else if (searchOrder === "byAuthor") {
      orderBy = "author";
    } else if (searchOrder === "byTitle") {
      orderBy = "title";
    }
    if (searchType === "maxPrice") {
      if (isNaN(searchText)) {
        return res.status(400).send('Please enter a number.');
      } else {
        database.searchByMaxPrice(searchText, orderBy)
          .then((results) => {
            const templateVars = { items: results};
            res.render("index", templateVars);
          });
      }
    } else if (searchType === "minPrice") {
      if (isNaN(searchText)) {
        return res.status(400).send('Please enter a number.');
      } else {
        database.searchByMinPrice(searchText, orderBy)
          .then((results) => {
            const templateVars = { items: results };
            res.render("index", templateVars);
          });
      }
    } else if (searchType === "title") {
      database.searchByTitle(searchText, orderBy)
        .then((results) => {
          const templateVars = { items: results };
          res.render("index", templateVars);
        });
    } else if (searchType === "artist") {
      database.searchByArtist(searchText, orderBy)
        .then((results) => {
          const templateVars = { items: results };
          res.render("index", templateVars);
        });
    } else {
      database.getAllItems()
        .then(rows => {
          const templateVars = { items: rows };
          res.render("index", templateVars);
        });
    }
  });
  return router;
};





