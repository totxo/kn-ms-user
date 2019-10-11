const {Kafka} = require('kafkajs');
const kafka = new Kafka({
    clientId: 'kn-ms-user',
    brokers: ['localhost:9092']
});

const topic = 'issue-creation-of-a-book';
const consumer = kafka.consumer({groupId: 'test-group'});

module.exports = {
    connectConsumer: async () => {
        await consumer.connect();
        await consumer.subscribe({topic});
        await consumer.run({
            // eachBatch: async ({ batch }) => {
            //   console.log(batch)
            // },
            eachMessage: async ({topic, partition, message}) => {
                const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                console.log(`- ${prefix} ${message.key}#${message.value}`)
            },
        });
    }
};