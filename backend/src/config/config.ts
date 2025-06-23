import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    queueUser: string;
    queuePassword: string;
    queueURL: string,
    queuePORT: number
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    queueUser: process.env.QUEUE_USER || 'guest',
    queuePassword: process.env.QUEUE_PASSWORD || 'guest',
    queueURL: process.env.QUEUE_URL || 'localhost',
    queuePORT: Number(process.env.QUEUE_PORT) || 5672
};

export default config;