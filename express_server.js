
// dependencies
const { urlsForUser, entryByID, userByPass, getUserByEmail, generateRandomString, users, urlDatabase  } = require("./helpers");
const bcrypt = require("bcryptjs");
const cookieSession = require('cookie-session');

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["secure"],
  maxAge: 60 * 60 * 1000
}));



// hosting confirmation by express:

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



// /login paths:

app.get("/login", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = {
      urls: urlDatabase,
      email: undefined};
    const userID = req.session.user_id;
    if (users[userID]) {
      templateVars.email = users[userID].email;
    }
    res.render("urls_login", templateVars);
  } else {
    res.redirect("/urls");
  }
});

app.post("/login", (req, res) => {
  const ID = generateRandomString();
  const userID = ID;
  const email = req.body.email;
  const password = req.body.password;
  
  if (getUserByEmail(email, users) !== undefined && email.length !== 0 && password.length !== 0) {
    if (userByPass(password)) {
      users[ID] = {
        id : userID,
        email: email,
        password: password
      };
      req.session.user_id = userID;
      res.redirect(`/urls`);
    } else {
      res.send("error code: 403, invalid login.\n Please check credentials and try again\n");        // <== example of error code and/or msg based on conditionals
    }
  } else {
    res.send("error code: 403, invalid login.\n Please check credentials and try again.\n If you haven't already registered then please do so prior to next attempt. \n");
  }
});


// /logout path:

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect(`/login`);
});




// /url paths:


app.post("/urls", (req, res) => {
  if (req.session.user_id) {
    const id = generateRandomString();
    const userID = req.session.user_id;
    const longURL = req.body.longURL;
    urlDatabase[id] = {longURL, userID};
    res.redirect(`/urls`);
  } else {
    res.send("Only Registered Users Can Shorten URLs\n");
    res.redirect("/urls");
  }
});

// main page

app.get("/urls", (req, res) => {
  if (req.session.user_id) {

    const userID = req.session.user_id;
    const templateVars = {
      id: req.params.id,
      urls: urlsForUser(userID),
      email: undefined };
    if (users[userID]) {
      templateVars.email = users[userID].email;
    }
    res.render("urls_index", templateVars);
  } else {
    res.send("please login to view short URL");
  }
  
});

// delete requests

app.post("/urls/:id/delete", (req, res) => {
  if (entryByID(req.params.id)) {
    if (req.session.user_id) {
      if (req.session.user_id === urlDatabase[req.params.id].userID) {
        delete urlDatabase[req.params.id];
        res.redirect(`/urls`);
      } else {
        res.send("you don't own this short URL\n");
      }
    } else {
      res.send("you need to be logged in to access this\n");
    }
  } else {
    res.send("this short URL doesn't exsit, please check that the short URL was entered correctly and try again.\n");
  }
});

// edit/update requests

app.post("/urls/:id/Edit", (req, res) => {
  if (entryByID(req.params.id)) {
    if (req.session.user_id) {
      if (req.session.user_id === urlDatabase[req.params.id].userID) {
        urlDatabase[req.params.id].longURL = req.body.longURL;
        res.redirect(`/urls`);
      } else {
        res.send("you don't own this short URL\n");
      }
    } else {
      res.send("you need to be logged in to access this\n");
    }
  } else {
    res.send("this short URL doesn't exsit, please check that the short URL was entered correctly and try again.\n");
  }
});

// create requests

app.get("/urls/new", (req, res) => {
  if (req.session.user_id) {
    const templateVars = {
      urls: urlDatabase,
      email: undefined};
    const userID = req.session.user_id;
    if (users[userID]) {
      templateVars.email = users[userID].email;
    }
    res.render("urls_new", templateVars);
  } else {
    res.redirect("/login");
  }
});

// pathing for details page expressed as urls_show

app.get("/urls/:id", (req, res) => {
  if (req.session.user_id) {
    const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id].longURL, email: undefined};
    const userID = req.session.user_id;
    if (req.session.user_id === urlDatabase[req.params.id].userID) {
      if (users[userID]) {
        templateVars.email = users[userID].email;
      }
      res.render("urls_show", templateVars);
    } else {
      res.send("you don't own this short URL!!!\n");
    }
  } else {
    res.send("please login to gain access\n");
  }

  // search/brower directing requests

  app.get("/u/:id", (req, res) => {
    const longURL = urlDatabase[req.params.id].longURL;
    if (entryByID(req.params.id)) {
      res.redirect(longURL);
    } else {
      res.send("ID does not exist\n");
    }
  });
});

// registeration paths:

app.get("/register", (req, res) => {
  if (!req.session.user_id) {
    const templateVars = {
      email: req.body.email,
      password: req.body.password
    };
    res.render("urls_register", templateVars);
  } else {
    res.redirect(`/urls`);
  }
});

app.post("/register", (req, res) => {
  const ID = generateRandomString();
  const userID = ID;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (getUserByEmail(email, users) === undefined && email.length !== 0 && password.length !== 0) {
    users[ID] = {
      id : userID,
      email: email,
      password: hashedPassword
    };
    req.session.user_id = userID;       // <== cookie being set as per specifcations
    res.redirect(`/urls`);
  } else {
    res.send("Error! status code: 400\n");
  }
});



