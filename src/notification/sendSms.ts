import axios from 'axios';
import config from 'config';

import { IContext } from '../interfaces/ILogger';
import logger from '../utils/loggers/logger';

const HOST = config.get('api.sms.url');
const PORT = config.get('api.sms.port');
const USERNAME = config.get('api.sms.username');
const PASSWORD = config.get('api.sms.password');

interface SmsInterface {
	msisdn: string;
	text: string;
}

const sendSms = async (request: SmsInterface) => {
	const text = request.text;
	let msisdn = request.msisdn;
	msisdn = msisdn.substr(msisdn.length - 9);

	const context: IContext = {
		label: 'SendSmsAPI',
		request: { msisdn, text },
	};

	const url =
		`http://${HOST}:${PORT}/send?username=${USERNAME}&password=${PASSWORD}&to=233${msisdn}&content=${text}`.replace(
			'#',
			'%23',
		);

	try {
		const response = await axios.get(url);
		context.response = response.data;
		logger.info(`[${msisdn}]-[${text}]`, context);

		return response.data;
	} catch (error: any) {
		context.error = { ...error };

		if (error.response) {
			context.error = { ...error.response.data };
			logger.warn(`[${msisdn}]-[${text}]`, context);
			return error.response.data;
		}

		logger.error(error, context);
		return null;
	}
};

export default sendSms;
