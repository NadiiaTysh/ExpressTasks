// Core
import express from 'express';
import bodyParser from 'body-parser';

// Tools
import { logger, errorLogger } from './utils';

// Routers
import * as routers from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

// Logger
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        let body = Object.keys(req.body).length !== 0 ? JSON.stringify(req.body) : 'No Payload';

        logger.debug(`${req.method} ${body ? `\n${body}` : ''}`);
        next();
    });
}

app.use('/users', routers.users);
app.use('/', routers.auth);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        errorLogger.error(errorMessage);

        const status = statusCode || 500;
        res.status(status).json({ message: message });
    });
}

export { app };
