const express = require('express');
const mongoose = require('mongoose');
const {connectMongoDB, addedNUsers} = require('./db/mongo.db');
const {connectConsumer} = require('./kafka/kafka.connect');
const userEndpoint = require('./endpoints/user.endpoint');

const app = express();
userEndpoint(app);

connectMongoDB()
    .then(() => connectConsumer())
    .then(() => {
        app.listen(3002, () => {
            // addedNUsers(20);
            console.info('Connected with userdb');
            console.info('kn-ms-user is running on port 3002');
        })
    });
