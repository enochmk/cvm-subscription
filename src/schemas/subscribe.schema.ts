import * as yup from 'yup';

export const subscribeProductSchema = yup.object({
	body: yup.object({
		msisdn: yup.string().min(9).max(10).required(),
		productID: yup.string().min(3).max(15).required(),
		message: yup.string().min(4).max(200).required(),
	}),
});

export type SubscribeProductInput = yup.InferType<
	typeof subscribeProductSchema
>['body'];
