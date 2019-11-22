import * as express from 'express';
import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import { HealthCheck, JournalSubmit, Authenticate } from './use-cases';
import config from './config';

function init(): Express {
    const app: Express = express();

    app.get('/health', HealthCheck());
    app.get('/submit', JournalSubmit(config, sign));
    app.get('/authenticate/*', Authenticate(config, sign))

    return app;
}

init().listen(config.port, () => console.log(`Service listening on port ${config.port}`));
