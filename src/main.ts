import express from 'express';
import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import {
    HealthCheck,
    JournalSubmit,
    Authenticate,
    GetProfile,
    RedirectLocation,
    GetPerson,
    userApiGetCurrentUser,
    userApiGetEditors,
    extractScienceBeam,
} from './use-cases';
import { typeDefs, resolvers } from './mock-graphql';
import config from './config';

function init(): void {
    const app: Express = express();
    const apolloServer: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        subscriptions: {
            onConnect: (): void => {
                console.log('Connected.');
            },
            onDisconnect: (): void => {
                console.log('Disconnected.');
            },
        },
    });

    app.get('/health', HealthCheck());

    // Mocks for reviewer-client are all in GQL
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

    // used for integration tests
    app.get('/redirect_location_for_intergration_test', RedirectLocation());

    const server = app.listen(3003);
    apolloServer.installSubscriptionHandlers(server);

    console.log(`Service listening on port 3003`);
}

init();
