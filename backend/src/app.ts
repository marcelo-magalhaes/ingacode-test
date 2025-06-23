import express from 'express';
import cors from 'cors';
import router from './routes/fileRoutes';
import mqConnection from './rabbitmq/config';

const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use('/api', router);

const connect = async () => {
    await mqConnection.connect();
}

connect(); 


export default app; 