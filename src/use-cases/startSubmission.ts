import { v4 } from 'uuid';

export const startSubmission = (submissions): ((_, { articleType }) => {}) => (_, { articleType }): {} => {
    const submission = {
        id: v4(),
        updated: new Date().toISOString(),
        articleType,
        status: 'INITIAL',
        createdBy: 'userId',
        files: {
            supportingFiles: [],
        },
    };
    submissions.push(submission);
    return submission;
};
