// Core
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

// Tools
import { sessionOptions } from './utils/options';

// Routers
import * as routers from './routers';

const app = express();

app.use(session(sessionOptions));
app.use(bodyParser.json({ limit: '10kb' }));

app.use('/users', routers.users);
app.use('/', routers.auth);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);

export { app };
