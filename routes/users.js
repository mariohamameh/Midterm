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
    database.getAllArtist()
      .then(users => {
        console.log("USERS:",users);
        res.json({ users });
      })
      .catch(err => {
        console.error(err);
        res.send(err);
      });
  });

  // GET favourites for logged in user
  router.get("/favourites", (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
      return res.redirect("/main");
    }
    database.getFavouritesForUser(userID)
      .then((favourites) => {
        const templateVars = { favourites };
        res.render("favourites", templateVars);
      });
  });


  // GET my_items for logged in user
  router.get("/myItems", (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
      return res.redirect("/main");
    }
    database.getUsersListings(userID)
      .then((myListings) => {
        const templateVars = { myItems };
        console.log(templateVars);
        res.render("myItems", templateVars);

      });
  });

  /// Create new Item
  router.post("/create_item", (req, res) => {
    const userID = req.session.user_id

    if(!userID) {
     return res.redirect("/main"); /// QUESTION -> where to redirect? login page?
    }

    const newListing = req.body;
    newListing.seller_id = userID;

    database.createNewItem(newListing)
    .then(() => {
      database.getUsersItem(userID)
        .then((res1) => {
          let templateVars = { myListings: res1 };
          return res.render("myListings", templateVars);
        });

      });
  });

  // DELETE delete your listing(s): Done
  router.post("/my_listings/:items_id/delete", (req, res) => {
    const userID = req.session.user_id;
    const listingID = req.params.items_id;
    if (!userID) {
      res.redirect("/");
    }
    database.deleteListing(userID, listingID)
      .then(() => {
        res.redirect("/api/users/myListings");
      });
  });


  // PUT mark your listing as sold: Done
  router.post("/my_listings/:items_id/sold", (req, res) => {
    const userID = req.session.user_id
    const listingID = req.params.items_id;

    if(!userID) {
    return res.redirect("/");
    }

    database.markListingAsSold(listingID)
      .then(() => {
        res.redirect("/api/users/myListings");
      });

});



  return router;
};




