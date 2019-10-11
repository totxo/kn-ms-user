const userRepository = require('../repositories/user.repository');

module.exports = {
    getOneUser: (username, req, res) => {
        return new Promise((resolve, reject) => {
            userRepository.getOneUser(username)
                .then((userDB) => resolve(userDB))
                .catch((err) => reject(err))
        })
    },
    updateCounterUser: (username) => {
        return new Promise((resolve, reject) => {
            userRepository.updateCounterUser(username)
                .then(() => resolve())
                .catch((err) => reject(err))
        })
    }
};