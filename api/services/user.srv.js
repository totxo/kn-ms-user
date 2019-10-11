const userRepository = require('../repositories/user.repository');

module.exports = {
    getOneUser: (username, req, res) => {
        return new Promise((resolve, reject) => {
            userRepository.getOneUser(username)
                .then((userDB) => resolve(userDB))
                .catch((err) => reject(err))
        })
    }
};