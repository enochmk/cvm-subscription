import config from 'config';
import winston from 'winston';
import transports from './transports';

const service = config.get('logger.service');

// Create logger with configurations
const logger = winston.createLogger({
	transports,
	levels: winston.config.npm.levels,
	defaultMeta: { service },
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.errors({ stack: true }),
	),
});

export default logger;
