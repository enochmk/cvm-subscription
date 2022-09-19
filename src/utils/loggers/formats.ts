import { format } from 'winston';
import rtracer from 'cls-rtracer';

// For console logs
export const pretty = format.printf((log: any): string => {
	const { timestamp, level, message } = log;
	return `[${timestamp}][${level.toUpperCase()}]: ${message}`;
});

// For JSON logs
export const json = format.printf((log: any): string => {
	const schema: any = {
		timestamp: log.timestamp,
		requestID: log?.requestID || rtracer.id(),
		service: log?.service,
		level: log.level,
		message: log.message,
		context: {
			label: log?.label,
			request: log?.request,
			response: log?.response,
			error: { ...log?.error },
		},
	};

	return JSON.stringify(schema);
});
