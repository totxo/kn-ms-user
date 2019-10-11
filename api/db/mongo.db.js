const casual = require('casual');
const User = require('../models/user.model');

module.exports = {
    addedNUsers: (n) => {
        for (let i = 0; i < n; i++) {
            let user = new User({
                username: casual.name
            });
            user.save();
        }
        console.info(`Se crearon ${n} usuarios`);
    }
};