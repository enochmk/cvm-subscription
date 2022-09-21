import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT || 5000,
	env: process.env.NODE_ENV || 'development',
	logger: {
		console: true,
		level: process.env.LOGGER_LEVEL || 'verbose',
		dirname: `${process.env.LOG_DIRECTORY}`,
		datePattern: 'YYYYMMDD',
	},
	api: {
		cbs: {
			url: process.env.CBS_URL,
			username: process.env.CBS_USERNAME,
			password: process.env.CBS_PASSWORD,
		},
		sms: {
			url: process.env.SMS_HOST,
			port: process.env.SMS_PORT,
			username: process.env.SMS_USERNAME,
			password: process.env.SMS_PASSWORD,
		},
	},
};
