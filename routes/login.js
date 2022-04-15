const express = require("express");
const router = express.Router();


module.exports = (database) => {
  router.get("/login", (req, res) => {
    let user = database.getUserWithId(req.session['user_id']);
    let items = database.getAllItems();
    const templateVars = {
      user: null,
      items: items
    };
    database.getUserWithEmail(req.body)
      .then((users) => res.render("login", templateVars))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password, database)
      .then(user => {

        if (!user) {

          res.send({error: "error"});
          return;
        }
        const templateVars = {
          user: user,
          
        };
        req.session.user_id = user.id;
        req.session.user_name = user.username;
        return res.redirect("/");
      })
      .catch(e => res.send(e));
  });
  return router;
};


const login =  function(email, password, database) {
  return database.getUserWithEmail(email)
    .then(user => {
    //hashed password goes here
      return user;
    });
};
exports.login = login;


function generateRandomString() {
  const minVal = 35 ** 5;
  const randomVal = Math.floor(Math.random() * minVal) + minVal;
  return randomVal.toString(35);
}

exports.generateRandomString = generateRandomString;

