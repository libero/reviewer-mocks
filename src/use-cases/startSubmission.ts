import { v4 } from 'uuid';

export const startSubmission = (submissions): ((_, { articleType }) => {}) => (_, { articleType }): {} => {
    const submission = {
        id: v4(),
        title: '',
        updated: new Date().toISOString(),
        articleType,
    };
    submissions.push(submission);
    return submission;
};
