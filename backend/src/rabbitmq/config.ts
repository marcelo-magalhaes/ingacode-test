import client, { Channel, ConsumeMessage, ChannelModel } from 'amqplib';
import config from '../config/config';

class RabbitMQConnection {
    connection!: ChannelModel;
    channel!: Channel;
    private connected!: Boolean;

    async connect() {
        if (this.connected && this.channel) return;
        else this. connected = true;

        try {
            console.log("Connecting to RabbitMQ Server");
            this.connection = await client.connect(
                `amqp://${config.queueUser}:${config.queuePassword}@${config.queueURL}:${config.queuePORT}`
            );

            console.log('RabbitMQ Connection is ready');

            this.channel = await this.connection.createChannel();

            console.log('Created Channel successfully');
        } catch (error) {
            console.error(error);
            console.error('Not connected to MQ Server');
        }
    }

    async sendToQueue(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;