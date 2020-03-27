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
    getCurrentUserREST,
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

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    app.get('/health', HealthCheck());
    app.get('/submit', JournalSubmit(config, sign));
    app.get('/authenticate/*', Authenticate(config, sign));
    app.get('/profiles/*', GetProfile());
    app.get('/people/*', GetPerson());
    app.get('/current-user', getCurrentUserREST());
    app.post('/science-beam/convert', extractScienceBeam());

    // used for integration tests
    app.get('/redirect_location_for_intergration_test', RedirectLocation());

    const server = app.listen(config.port);
    apolloServer.installSubscriptionHandlers(server);

    console.log(`Service listening on port ${config.port}`);
}

init();
