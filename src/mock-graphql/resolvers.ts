import { getSubmissions, startSubmission } from '../use-cases';

const submissions = [];

export const resolvers = {
    Query: {
        getCurrentUser: getCurrentUser(),
        getSubmissions: getSubmissions(submissions),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
    },
};
