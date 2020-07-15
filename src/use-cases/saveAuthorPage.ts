import { logger } from '../logger';
export const saveAuthorPage = (
    submissions: Array<{ id: string; lastStepVisited: string; author: {} }>,
): ((_, { id, details }) => {}) => (_, { id, details = {} }): {} => {
    logger.info(`saveAuthorPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        submission.author = details;
        submission.lastStepVisited = `/submit/${submission.id}/author`;
        return submission;
    }
    throw new Error('could not find submission with id: ' + id);
};
