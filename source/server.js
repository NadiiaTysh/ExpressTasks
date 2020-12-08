// Core
import express from 'express';
import bodyParser from 'body-parser';

// // Logger
import { logger } from './utils';

// Routers
import * as routers from './routers';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

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

export { app };
