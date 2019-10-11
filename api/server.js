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

connectMongoDB()
    .then(() => connectConsumer())
    .then(() => {
        app.listen(3002, () => {
            // addedNUsers(20);
            console.info('Connected with userdb');
            console.info('kn-ms-user is running on port 3002');
        })
    });
