// dependencies

const bcrypt = require("bcryptjs");


// relevent Database object templates:

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW",
  },
  x2BN0h: {
    longURL: "https://www.lighthouselabs.ca",
    userID: "fd3g4W",
  },
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



// helper functions:


// random code generator

const generateRandomString = function() {
  const chars = "abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ0123456789";
  let result = "";
  for (let i = 0; i <= 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


// find user by email

const getUserByEmail = function(email, db) {
  for (let key in db) {
    if (db[key].email === email) {
      return db[key];
    }
  }
  return undefined;
};


//  password confirmation

const userByPass = function(pass) {
  for (let key in users) {
    if (bcrypt.compareSync(pass, users[key].password)) {
      return true;
    }
  }
  return false;
};


// data entry confirmation

const entryByID = function(ID) {
  for (let key in urlDatabase) {
    if (key === ID) {
      return true;
    }
  }
  return false;
};


// fetches URLs per user
 
urlsForUser = function(id) {
  const urls = {};
  for (let key in urlDatabase) {
    if (urlDatabase[key].userID === id) {
      urls[key] = urlDatabase[key].longURL;
    }
  }
  return urls;
};

// export logic:

module.exports = { urlsForUser, entryByID, userByPass, getUserByEmail, generateRandomString, users, urlDatabase  };