const casual = require('casual');
const User = require('../models/user.model');

module.exports = {
    connectMongoDB: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://localhost:27015/userdb', {
                useNewUrlParser: true, useUnifiedTopology: true
            })
                .then((res, err) => {
                    if (err) return reject(err);
                    resolve();
                });
        })
    },
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