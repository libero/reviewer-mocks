import { getSubmissions, startSubmission } from '../use-cases';

const submissions = [];

export const resolvers = {
    Query: {
        getSubmissions: getSubmissions(submissions),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
    },
};
