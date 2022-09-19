import { Request, Response } from 'express';
import asyncHandler from '../middlewares/async.middleware';
import subscribeProductService from '../services/subscribeProductService';

const subscribeProductController = asyncHandler(
	async (req: Request, res: Response) => {
		const msisdn: string = req.body.msisdn;
		const message: string = req.body.message;
		const productID: number = req.body.productID;

		// call subscribeProductService
		const response = await subscribeProductService({
			productID,
			message,
			msisdn,
		});

		// Respond to API call
		res.status(200).json({ status: true, ...response });
	},
);

export default subscribeProductController;
