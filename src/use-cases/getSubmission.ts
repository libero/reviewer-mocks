import { logger } from '../logger';
export const getSubmission = (submissions: Array<{ id: string }>): ((_, { id }) => {}) => (_, { id }): {} => {
    logger.info(`getSubmission(${id})`);

    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
