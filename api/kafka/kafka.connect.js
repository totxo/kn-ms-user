const {Kafka} = require('kafkajs');
const userSrv = require('../services/user.srv');

const kafka = new Kafka({
    clientId: 'kn-ms-user',
    brokers: ['localhost:9092']
});

const topic = 'issue-creation-of-a-book';
const consumer = kafka.consumer({groupId: 'test-group'});

module.exports = {
    connectConsumer: async () => {
        return new Promise(async (resolve, reject) => {
            await consumer.connect();
            await consumer.subscribe({topic});
            await consumer.run({
                eachMessage: async ({topic, partition, message}) => {
                    // const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
                    // console.log(`- ${prefix} ${message.key}#${message.value}`);
                    const payload = JSON.parse(message.value);
                    userSrv.updateCounterUser(payload.editedBy)
                        .then(() => {
                            console.log(`>>>>>>>>>>  ${payload.editedBy} +1 !!   <<<<<<<<<<<<<<<<`);
                        })
                },
            });
            resolve();
        });
    }
};