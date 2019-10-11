const User = require('../models/user.model');

module.exports = {
  getOneUser: (username) => {
      return new Promise((resolve, reject) => {
          User.findOne({username: username}, (err, userDB) => {
              if (err) return reject(err);
              resolve(userDB);
          })
      })
  },
    updateCounterUser: (username) => {
      return new Promise((resolve, reject) => {
          User.updateOne({username: username}, {$inc: {counterOfEditedBooks: 1}}, (err) => {
              if (err) return reject(err);
              resolve();
          })
      })
    }
};