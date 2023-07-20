// dependencies

const bcrypt = require("bcryptjs");
const { urlDatabase, users } = require("./database");




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

const verifyUserIdByEmail = function(email, db) {
  for (let key in db) {
    if (db[key].email === email) {
      return key;
    }
  }
  return undefined;
};



const verifyPassword = function(pass, userID) {
  if (bcrypt.compareSync(pass, users[userID].password)) {
    return true;
  }
  return false;
};



const verifyOwnership = function(ID) {
  for (let key in urlDatabase) {
    if (key === ID) {
      return true;
    }
  }
  return false;
};


// fetches URLs per user
 
const urlsForUser = function(id) {
  const urls = {};
  for (let key in urlDatabase) {
    if (urlDatabase[key].userID === id) {
      urls[key] = urlDatabase[key].longURL;
    }
  }
  return urls;
};



// export logic:

module.exports = { urlsForUser, verifyOwnership, verifyPassword, getUserByEmail, generateRandomString, users, urlDatabase, verifyUserIdByEmail  };