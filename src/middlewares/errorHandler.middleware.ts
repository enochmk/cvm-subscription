import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import rtracer from 'cls-rtracer';

import { IContext } from '../interfaces/ILogger';
import appMessages from '../messages/app.messages';
import HttpError from '../utils/errors/HttpError';
import ValidationError from '../utils/errors/ValidationError';
import logger from '../utils/loggers/logger';

// eslint-disable-next-line
const errorMiddleware = async (
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const requestID = rtracer.id();
	const context: IContext = {
		label: error?.context?.label || 'App',
		request: error?.context?.request,
		response: error?.context?.response,
		error: error?.context?.error,
		requestID: error?.context?.requestID,
	};

	const response = {
		requestID: requestID,
		timestamp: moment(),
		status: false,
		message: error.message,
	};

	if (error instanceof HttpError) {
		logger.warn(error.message, context);
		return res.status(error.statusCode).json(response);
	}

	if (error instanceof ValidationError) {
		logger.warn(error.message, context);
		return res.status(error.statusCode).json(response);
	}

	// ! unhandled exceptions
	response.message = appMessages.GENERIC_ERROR;
	logger.error(response.message, context);
	return res.status(error.statusCode || 500).json(response);
};

export default errorMiddleware;
