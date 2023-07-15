const cookieParser = require("cookie-parser");


const express = require("express");
const app = express();
const PORT = 8080; // default port 8080



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

const generateRandomString = function() { const chars = "abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ0123456789"
let result = "";
for (let i = 0; i <= 6; i++ ){
  result += chars.charAt(Math.floor(Math.random() * chars.length));
}
return result; 
};

const userByEmail = function(email) {
  for (let key in users){
    if (users[key].email === email){
      console.log(users[key])
      return users[key];
    }
  }
  return null;
};

const userByPass = function(password) {
  for (let key in users){
    if (users[key].password === password){
      console.log(users[key])
      return users[key];
    }
  }
  return null;
};


app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.post("/login", (req, res) => {
  const ID = generateRandomString();
  const userID = ID
  const email = req.body.email 
  const password = req.body.password
  
  if (userByEmail(email) !== null && email.length !== 0 && password.length !== 0) {
    if (userByPass(password) !== null){
  users[ID] = {
    id : userID,
    email: email,
    password: password
    }
  res.cookie("userID", userID)
  res.redirect(`/urls`);
  console.log(users)
  } else {
    res.send("error code: 403, invalid Login, please check credentials and try again") 
  }
  } else {
  res.send("error code: 403, invalid Login, please check credentials and try again") 
  }
  });

app.get("/login", (req, res) => {
  const templateVars = { 
    urls: urlDatabase, 
    email: undefined};
    const userID = req.cookies.userID;
    if (users[userID]) {
      templateVars.email = users[userID].email
    };
    res.render("urls_login", templateVars);
});

app.post("/logout", (req, res) => {
  res.clearCookie("userID");
     res.redirect(`/login`);
});

app.get("/urls", (req, res) => {
  const templateVars = { 
    urls: urlDatabase, 
    email: undefined};
    const userID = req.cookies.userID;
    if (users[userID]) {
      templateVars.email = users[userID].email
    }
  res.render("urls_index", templateVars);
});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]
  res.redirect(`/urls`)
});

app.post("/urls/:id/Edit", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL
  res.redirect(`/urls`)
});

app.post("/urls", (req, res) => {
  const id = generateRandomString()
  urlDatabase[id] = req.body.longURL; 
  res.redirect(`/urls`);
});

app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id]
  res.redirect(longURL);
});

app.get("/urls/new", (req, res) => {
  const templateVars = { 
    urls: urlDatabase, 
    email: undefined};
    const userID = req.cookies.userID;
    if (users[userID]) {
      templateVars.email = users[userID].email;
    }
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id], email: undefined  };
  const userID = req.cookies.userID;
  if (users[userID]) {
    templateVars.email = users[userID].email};
  res.render("urls_show", templateVars);
});

app.get("/register", (req, res) => {
  const templateVars = { email: req.body.email, password: req.body.password };
  res.render("urls_register", templateVars);
});

app.post("/register", (req, res) => {
  const ID = generateRandomString();
const userID = ID
const email = req.body.email 
const password = req.body.password

if (userByEmail(email) === null && email.length !== 0 && password.length !== 0) {
users[ID] = {
  id : userID,
  email: email,
  password: password
  }
  res.cookie("userID", userID)
res.redirect(`/urls`);
console.log(users)

} else {
res.send("Error! status code: 400") 
}
});



