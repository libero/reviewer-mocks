import express from 'express';
import * as http from 'http';
import { Express, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import {
    HealthCheck,
    JournalSubmit,
    Authenticate,
    GetProfile,
    RedirectLocation,
    GetPerson,
    GetPeople,
    userApiGetCurrentUser,
    userApiGetEditors,
    extractScienceBeam,
} from './use-cases';
import { typeDefs, resolvers } from './mock-graphql';
import config from './config';
import { logger } from './logger';

function dumpConfig(): void {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const outConfig = (({ port, continuum_return_url, login_return_url, mockDataDirectoryPath }) => ({
        port,
        continuum_return_url,
        login_return_url,
        mockDataDirectoryPath,
    }))(config);

    logger.info(`Configuration ${JSON.stringify(outConfig, null, 4)}`);
}

function init(): http.Server {
    dumpConfig();
    const app: Express = express();
    logger.info(`Creating ApolloServer`);
    const apolloServer: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        subscriptions: {
            onConnect: (): void => {
                logger.info('Connected.');
            },
            onDisconnect: (): void => {
                logger.info('Disconnected.');
            },
        },
    });

    app.use('/', (req: Request, _res: Response, next) => {
        logger.info(`${req.method} ${req.path}`);
        next();
    });

    app.get('/health', HealthCheck());

    // Mocks for reviewer-client are all in GQL
    logger.info(`Applying middleware for graphql`);
    apolloServer.applyMiddleware({ app, path: '/graphql' });
    // ... reviewer-client also needs this (LOGIN_URL)
    app.get('/submit', JournalSubmit(config, sign));

    // Mocks for reviewer-submission
    app.get('/authenticate/*', Authenticate(config, sign));
    app.post('/science-beam/convert', extractScienceBeam());
    // ... mocking of User API
    app.get('/current-user', userApiGetCurrentUser());
    app.get('/editors', userApiGetEditors());

    // Mocks of journal for continuum-adaptor
    app.get('/profiles/*', GetProfile());
    app.get('/people/*', GetPerson());
    app.get('/people', GetPeople());

    // used for integration tests
    app.get('/redirect_location_for_intergration_test', RedirectLocation());

    logger.info(`Starting service on port ${config.port}`);

    const server = app.listen(3003);
    apolloServer.installSubscriptionHandlers(server);
    logger.info(`Service listening on port ${config.port}`);
    return server;
}

function main(): void {
    const serverHandle = init();

    process.on('SIGINT', () => {
        serverHandle.close(() => {
            process.exit(0);
        });
    });

    process.on('SIGTERM', () => {
        serverHandle.close(() => {
            process.exit(0);
        });
    });
}

main();
