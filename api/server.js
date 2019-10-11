const express = require('express');
const mongoose = require('mongoose');
const {connectMongoDB, addedNUsers} = require('./db/mongo.db');
const {connectConsumer} = require('./kafka/kafka.connect');
const app = express();

app.get('/user/:userID', (req, res) => {
    /*
    * SHOW
    * {
    *   _id: user._id,
    *    user: user.name,
    *    countCreatedBooks: user.countCreatedBooks
    * }
    */
    res.status(200).json({status: 'ok'})
});

mongoose.connect('mongodb://localhost:27015/userdb', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then((res, err) => {
        if (err) return console.error(err);
        console.info('Connected with userdb');
        app.listen(3002, () => {
            // addedNUsers(20);
            connectConsumer();
            console.info('kn-ms-user is running on port 3002');
        })
    });