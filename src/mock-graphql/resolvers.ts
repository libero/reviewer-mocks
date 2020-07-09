import { PubSub } from 'apollo-server-express';

import {
    getSubmissions,
    startSubmission,
    getCurrentUser,
    getSubmission,
    deleteSubmission,
    saveDisclosurePage,
    saveAuthorPage,
    saveDetailsPage,
    saveFilesPage,
    uploadManuscript,
    fileUploadProgress,
    uploadSupportingFile,
    deleteSupportingFile,
    saveEditorPage,
    getEditors,
    submit,
    submitSurveyResponse,
} from '../use-cases';

const submissions = [];
const pubsub = new PubSub();

export const resolvers = {
    Query: {
        getCurrentUser,
        getSubmissions: getSubmissions(submissions),
        getSubmission: getSubmission(submissions),
        getEditors: getEditors(),
    },
    Mutation: {
        startSubmission: startSubmission(submissions),
        deleteSubmission: deleteSubmission(submissions),
        saveDisclosurePage: saveDisclosurePage(submissions),
        saveAuthorPage: saveAuthorPage(submissions),
        saveFilesPage: saveFilesPage(submissions),
        saveDetailsPage: saveDetailsPage(submissions),
        uploadManuscript: uploadManuscript(submissions, pubsub),
        uploadSupportingFile: uploadSupportingFile(submissions, pubsub),
        deleteSupportingFile: deleteSupportingFile(submissions),
        saveEditorPage: saveEditorPage(submissions),
        submit: submit(submissions),
        submitSurveyResponse,
    },
    Subscription: {
        fileUploadProgress: fileUploadProgress(pubsub),
    },
};
