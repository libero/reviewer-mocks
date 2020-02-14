import {
    getSubmissions,
    startSubmission,
    getCurrentUser,
    getSubmission,
    deleteSubmission,
    saveDetailsPage,
} from '../use-cases';

const submissions = [];

export const resolvers = {
    Query: {
        getCurrentUser: getCurrentUser(),
        getSubmissions: getSubmissions(submissions),
        getSubmission: getSubmission(submissions),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
        deleteSubmission: deleteSubmission(submissions),
        saveDetailsPage: saveDetailsPage(submissions),
    },
};
