import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

import ValidationError from '../utils/errors/ValidationError';
import { IContext } from '../interfaces/ILogger';
import logger from '../utils/loggers/logger';

const validator =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		console.log({ body: req.body });
		const context: IContext = {
			label: 'SchemaValidator',
			request: {
				body: req.body,
				query: req.query,
				params: req.params,
			},
		};

		try {
			const response = await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			context.response = response;
			logger.info('success', context);

			return next();
		} catch (error: any) {
			logger.warn(error.message, context);
			return next(new ValidationError(error));
		}
	};

export default validator;
