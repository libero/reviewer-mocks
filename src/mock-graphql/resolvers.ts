import { getSubmissions, startSubmission, getCurrentProfile } from '../use-cases';

const submissions = [];

export const resolvers = {
    Query: {
        getCurrentProfile: getCurrentProfile(),
        getSubmissions: getSubmissions(submissions),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
    },
};
