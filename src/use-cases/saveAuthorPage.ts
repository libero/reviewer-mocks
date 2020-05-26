import { logger } from '../logger';
export const saveAuthorPage = (submissions: Array<{ id: string; author: {} }>): ((_, { id, details }) => {}) => (
    _,
    { id, details = {} },
): {} => {
    logger.info(`saveAuthorPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].author = details;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
