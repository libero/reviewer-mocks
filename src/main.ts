import express from 'express';
import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';

import { HealthCheck, JournalSubmit, Authenticate, GetProfile, RedirectLocation } from './use-cases';
import { typeDefs, resolvers } from './mock-graphql';
import config from './config';

function init(): Express {
    const app: Express = express();
    const apolloServer: ApolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    apolloServer.applyMiddleware({ app, path: '/graphql' });

    app.get('/health', HealthCheck());
    app.get('/submit', JournalSubmit(config, sign));
    app.get('/authenticate/*', Authenticate(config, sign));
    app.get('/profiles/*', GetProfile());

    // used for integration tests
    app.get('/redirect_location_for_intergration_test', RedirectLocation());

    return app;
}

init().listen(config.port, () => console.log(`Service listening on port ${config.port}`));
