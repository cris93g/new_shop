require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const massive = require("massive");
const routes = require("./routes/routes");
const session = require("express-session");
const passport = require('passport');
const {
  getUser,
  strat,
  logout
} = require(`${__dirname}/controllers/itemCtrl/authCtrl/authCtrl`);


const app = express();
const port = process.env.PORT ||3001;

app.use(cors());
app.use(json());

massive(process.env.CONNECTION_STRING).then(dbinstance => {
  app.set("db", dbinstance);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);


//functions for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

// What properties do we want our user to have on session?
passport.serializeUser((profile, done) => {
  console.log(profile);
  const db = app.get("db");
  db.getUserByAuthid(profile.id).then(user => {
    // console.log(profile.name);
    if (!user[0]) {
      db.addUserByAuthid(profile.id, profile.picture, profile.displayName)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});

// Put user on req.session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/#/"
  })
);
app.get("/me", getUser);
app.get("/logout", logout);
routes(app);
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
