import { v4 } from 'uuid';

export const startSubmission = (submissions): ((articleType: string) => {}) => (articleType: string) => {
    const submission = {
        id: v4(),
        title: '',
        updated: new Date().toISOString(),
        articleType,
    };
    submissions.push(submission);
    return submission;
};
