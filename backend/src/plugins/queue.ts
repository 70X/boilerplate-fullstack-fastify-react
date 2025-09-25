import amqp from 'amqplib';

export const queue = 'test_queue';
const dlqQueue = 'test_queue_dlq';

export const initRabbitMQ = async (mqpUrl = 'amqp://user:pass@localhost:5672'): Promise<amqp.Channel> => {
  const connection = await amqp.connect(mqpUrl);
  const channel = await connection.createChannel();
  await channel.assertQueue(dlqQueue, { durable: false });

  // declare main queue with DLX pointing to DLQ
  await channel.assertQueue(queue, {
    durable: false,
    arguments: {
      'x-dead-letter-exchange': '', // default exchange
      'x-dead-letter-routing-key': dlqQueue,
    },
  });
  channel.consume(queue, (msg) => {
    if (msg) {
      try {
        // simulate random failure
        if (Math.random() < 0.5) {
          throw new Error('Random consumer failure!');
        }

        console.log('✅ Processed:', msg.content.toString());
        channel.ack(msg);
      } catch (err) {
        console.error('❌ Error:', (err as Error).message);
        // send to DLQ by rejecting without requeue
        channel.nack(msg, false, false);
      }
    }
  });
  return channel;
};
