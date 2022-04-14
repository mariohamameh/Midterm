const express = require("express");
const router = express.Router();

module.exports = (database) => {
  router.get("/logout", (req, res) => {
    let user = database.getUserWithId(req.session["user_id"]);
    const templateVars = {
      user: user,
    };
    res.render("logout", templateVars);
  });

  router.post("/logout", (req, res) => {

    // const templateVars = {
    //   user: null,
    // };
    res.redirect("/");
  });
  return router;
};
