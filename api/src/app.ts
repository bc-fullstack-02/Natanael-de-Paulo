import 'express-async-errors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './app/routers';
import { ConnectDb } from './app/database';
import { AppError } from './app/shared/middlewares/AppError';

import swaggerDosc from './swagger.json';
export const app = express();

// CORS allow resource sharing between different origins on each request
app.use(cors());

// adding Helmet to improve HTTP headers security
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use(AppError);

// connect db
app.use((req, res, next) => ConnectDb
	.then(() => next())
	.catch(err => next(err)));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDosc));

app.get('/terms', (req, res) => {
	return res.json({
		message: 'Termos de Serviço'
	});
});