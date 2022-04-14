const express = require("express");
const router = express.Router();

module.exports = (database) => {
  router.get("/logout", (req, res) => {
    let user = database.getUserWithId(req.session["user_id"]);
    let items = database.getAllItems();
    const templateVars = {
      user: null,
      items: items
    };
    res.render("logout", templateVars);
  });

  router.post("/logout", (req, res) => {

    req.session.user_id = null;
    res.redirect("/");
  });
  return router;
};
