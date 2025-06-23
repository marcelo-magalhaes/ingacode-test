import { Request, Response, Router } from 'express';
import { receiveData } from '../controllers/fileController';

const router = Router();


router.post('/', receiveData);


export default router;