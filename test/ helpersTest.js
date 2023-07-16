const { assert } = require('chai');



const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with a valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedUserID = "userRandomID";
    assert(user.id === expectedUserID, `${user} !== ${expectedUserID}`);
  });
  it('should return undefined with an invalid email', function() {
    const user = getUserByEmail("user@goggle.com", testUsers);
    const expectedUserID = undefined;
    assert(user === expectedUserID,  `${user} !== ${expectedUserID}`);
  });
});