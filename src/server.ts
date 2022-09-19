import config from 'config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import rtracer from 'cls-rtracer';

import errorHandler from './middlewares/errorHandler.middleware';
import logger from './utils/loggers/logger';
import routes from './routes';

const port = config.get('port') as number;
const env = config.get('env') as string;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(rtracer.expressMiddleware());
app.use(routes);
app.use(errorHandler);

// start express server
app.listen(port, async () => {
	const message = `Server is running in mode: ${env} at http://localhost:${port}`;
	logger.verbose(message, { label: 'Startup' });
});
