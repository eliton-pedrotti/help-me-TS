import { Router } from 'express';
import multer from 'multer';
import LoginController from './controllers/LoginController';
import UserController from './controllers/UserController';
import Authentication from './middlewares/Authentication';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig)

router.post('/users', upload.single('file'), UserController.store);

router.post('/sessions', LoginController.store);

router.use(Authentication)


export default router;