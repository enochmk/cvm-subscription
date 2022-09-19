import { IContext } from '../../interfaces/ILogger';
import Messages from '../../messages/app.messages';

class GenericError extends Error {
	statusCode: number;
	responseCode: string;

	context: IContext;

	constructor(context: IContext) {
		super(Messages.TECHNICAL_ISSUE);
		this.name = 'GenericError';
		this.context = context;
		this.statusCode = 500;
		this.responseCode = '55';
	}
}

export default GenericError;
