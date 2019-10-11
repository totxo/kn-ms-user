const express = require('express');
const mongoose = require('mongoose');
const { Kafka } = require('kafkajs');
const {addedNUsers} = require('./db/mongo.db');

const kafka = new Kafka({
    clientId: 'kn-ms-user',
    brokers: ['localhost:9092']
});

const topic = 'issue-creation-of-a-book';
const consumer = kafka.consumer({ groupId: 'test-group' });

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
        app.listen( 3002, async () => {
            // addedNUsers(20);
            await consumer.connect();
            await consumer.subscribe({topic});
            await consumer.run({
                // eachBatch: async ({ batch }) => {
                //   console.log(batch)
                // },
                eachMessage: async ({ topic, partition, message }) => {
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    console.log(`- ${prefix} ${message.key}#${message.value}`)
                },
            });
            console.info('kn-ms-user is running on port 3002');
        })
    });