import { IContext } from '../../interfaces/ILogger';

class HttpError extends Error {
	statusCode: number;

	context: IContext | null;

	responseCode: string | null;

	constructor(
		message: string,
		statusCode: number,
		context: IContext | null = null,
		responseCode: string | null = null,
	) {
		super(message);
		this.name = 'HttpError';
		this.statusCode = statusCode || 500;
		this.context = context;
		this.responseCode = responseCode;
	}
}

export default HttpError;
