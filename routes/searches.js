const express = require("express");
const router = express.Router();

module.exports = (database) => {
  router.get("/", (req, res) => {
    console.log("hello world");
    const searchText = req.query.searchText;
    const searchType = req.query.searchType;
    const searchOrder = req.query.searchOrder;
    const user_id = req.session.user_id;
    database.getUserWithId(user_id).then((result) => {
      console.log("result:", result);
      const user = result;
      console.log("user", user);
      let orderBy = "";

      if (searchOrder === "highPrice") {
        orderBy = "ORDER BY items.price DESC";
      } else if (searchOrder === "lowPrice") {
        orderBy = "ORDER BY items.price";
      }
      if (searchType === "maxPrice") {
        if (isNaN(searchText)) {
          return res.status(400).send("Please enter a number.");
        } else {
          database.searchByMaxPrice(searchText, orderBy).then((results) => {
            const templateVars = { user: user, items: results };
            //console.log("testing render for Index 1", results)
            res.render("index", templateVars);
          });
        }
      } else if (searchType === "minPrice") {
        if (isNaN(searchText)) {
          return res.status(400).send("Please enter a number.");
        } else {
          database.searchByMinPrice(searchText, orderBy).then((results) => {
            const templateVars = { user: user, items: results };
            //console.log("testing render for Index 2", results)
            res.render("index", templateVars);
          });
        }
      } else if (searchType === "title") {
        database.searchByTitle(searchText, orderBy).then((results) => {
          const templateVars = { user: user, items: results };
          //console.log("testing render for Index 3", results)
          res.render("index", templateVars);
        });
      } else if (searchType === "artist") {
        database.searchByArtist(searchText, orderBy).then((results) => {
          // console.log("result:",results)
          const templateVars = { user: user, items: results };
          // console.log("testing render for Index 4", results);
          // console.log(templateVars);
          res.render("index", templateVars);
        });
      } else {
        database.getAllItems().then((rows) => {
          const templateVars = { user: user, items: rows };
          //console.log("testing render for Index 5", rows)
          res.render("index", templateVars);
        });
      }
    });
  });
  return router;
};
