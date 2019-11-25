import { v4 } from 'uuid';

export const startSubmission = (submissions): (() => {}) => () => {
    const submission = {
        id: v4(),
        title: '',
        updated: new Date().toISOString(),
    };
    submissions.push(submission);
    return submission;
};
