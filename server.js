// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const database = require('./routes/database.js');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");


// PG database client/connection setup
/*
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
*/
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["user_id", "abc"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const users = require("./routes/login");
const search = require("./routes/searches");
const conversations = require("./routes/conversations")
const favourites = require("./routes/favourites");

const userlogout = require("./routes/logout");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", userlogout(database));
app.use("/", users(database));
app.use("/api/users", usersRoutes(database));
app.use("/api/widgets", widgetsRoutes(database));
app.use("/api/search", search(database));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  database.getUserWithId(req.session['user_id'])
  .then((user)=> {
    database.getAllItems()
    .then((items)=> {
      console.log(user);
      const templateVars = {
        user: user,
        items: items
      }
      res.render("index", templateVars );
    })
  });




});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
