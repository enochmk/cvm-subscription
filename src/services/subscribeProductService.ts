import subscribeProductApi from '../api/appendantProductAPI';
import sendSms from '../notification/sendSms';

interface IRequest {
	msisdn: string;
	productID: number;
	message?: string;
}

async function subscribeProductService(data: IRequest) {
	const { msisdn, productID, message } = data;

	// ? get a session ID from EDA
	await subscribeProductApi(msisdn, productID);

	// * send SMS
	sendSms({ msisdn, text: message! });

	return {
		message: message!,
	};
}

export default subscribeProductService;
