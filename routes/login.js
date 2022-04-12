const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (database) => {
  router.get("/login", (req, res) => {
    console.log(`incoming ${req.params}`);
    database.getUserWithEmail(req.params)
      .then((users) => res.send({ users }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};


const login =  function(email, password) {
  return database.getUserWithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
}
exports.login = login;

router.post('/login', (req, res) => {
  const {email, password} = req.body;
  login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
});
