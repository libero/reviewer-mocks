import { PubSub } from 'apollo-server-express';

import {
    getSubmissions,
    startSubmission,
    getCurrentUser,
    getSubmission,
    deleteSubmission,
    saveAuthorPage,
    saveDetailsPage,
    saveFilesPage,
    uploadManuscript,
    manuscriptUploadProgress,
    uploadSupportingFile,
    supportingUploadProgress,
} from '../use-cases';

const submissions = [];
const pubsub = new PubSub();

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
        saveDetailsPage: saveDetailsPage(submissions),
        uploadManuscript: uploadManuscript(submissions, pubsub),
        uploadSupportingFile: uploadSupportingFile(submissions, pubsub),
    },
    Subscription: {
        manuscriptUploadProgress: manuscriptUploadProgress(pubsub),
        supportingUploadProgress: supportingUploadProgress(pubsub),
    },
};
