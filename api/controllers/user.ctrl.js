const userSrv = require('../services/user.srv');

module.exports = {
    getOneUser: (req, res) => {
        const username = req.params.username;
        userSrv.getOneUser(username, req, res)
            .then((userDB) => res.status(200).json(userDB))
    }
};