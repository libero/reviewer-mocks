import {
    getSubmissions,
    startSubmission,
    getCurrentUser,
    getSubmission,
    deleteSubmission,
    saveDetailsPage,
    saveFilesPage,
    uploadManuscript,
} from '../use-cases';

const submissions = [];

export const resolvers = {
    Query: {
        getCurrentUser,
        getSubmissions: getSubmissions(submissions),
        getSubmission: getSubmission(submissions),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
        deleteSubmission: deleteSubmission(submissions),
        saveDetailsPage: saveDetailsPage(submissions),
        saveFilesPage: saveFilesPage(submissions),
        uploadManuscript: uploadManuscript(submissions),
    },
};
