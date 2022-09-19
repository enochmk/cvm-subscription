import config from 'config';
import winston from 'winston';
import 'winston-daily-rotate-file';

import * as logFormatter from './formats';

const datePattern = config.get('logger.datePattern') as string;
const dirname = config.get('logger.dirname') as string;
const level = config.get('logger.level') as string;

const transports: Array<any> = [
	new winston.transports.DailyRotateFile({
		level,
		datePattern,
		dirname,
		filename: '%DATE%.log',
		format: winston.format.combine(logFormatter.json),
	}),
];

// if console logging is enabled
if (config.get('logger.console')) {
	transports.push(
		new winston.transports.Console({
			level,
			format: winston.format.combine(
				logFormatter.pretty,
				winston.format.colorize({ all: true }),
			),
		}),
	);
}

export default transports;
