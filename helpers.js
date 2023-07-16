const bcrypt = require("bcryptjs");

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



const generateRandomString = function() { const chars = "abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ0123456789"
let result = "";
for (let i = 0; i <= 6; i++ ){
  result += chars.charAt(Math.floor(Math.random() * chars.length));
}
return result; 
};



const getUserByEmail = function(email, users) {
  for (let key in users){
    if (users[key].email === email){
      return users[key];
    }
  }
  return null;
};



const userByPass = function(pass) {
  for (let key in users){
    if (bcrypt.compareSync(pass, users[key].password)){
      return true;
    }
  }
  return null;
};



const entryByID = function(ID) {
  for (let key in urlDatabase){
    if (key === ID){
      return true;
    }
  }
  return false;
};



urlsForUser = function(id) {
  const urls = {};
  for (let key in urlDatabase){
    if (urlDatabase[key].userID === id){
      urls[key] = urlDatabase[key].longURL;
    }   
  }
  console.log(urls);
  return urls;
};


module.exports = { urlsForUser, entryByID, userByPass, getUserByEmail, generateRandomString, users, urlDatabase  }