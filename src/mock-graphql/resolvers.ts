import {
    getSubmissions,
    startSubmission,
    getCurrentUser,
    getSubmission,
    deleteSubmission,
    saveAuthorPage,
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
        saveAuthorPage: saveAuthorPage(submissions),
        saveFilesPage: saveFilesPage(submissions),
        uploadManuscript: uploadManuscript(submissions),
    },
};
