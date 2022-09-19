import express from 'express';
import subscribeProductController from './controllers/subscribeProductController';
import validator from './middlewares/validator.middleware';
import { subscribeProductSchema } from './schemas/subscribe.schema';

const router = express.Router();

router
	.route('/api/cvm')
	.post(validator(subscribeProductSchema), subscribeProductController);

export default router;
