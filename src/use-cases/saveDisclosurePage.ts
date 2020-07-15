import { logger } from '../logger';

export const saveDisclosurePage = (
    submissions: Array<{ id: string; lastStepVisited: string; disclosure: {} }>,
): ((_, { id, details }) => {}) => {
    return (_, { id, details = {} }): {} => {
        logger.info(`saveDisclosurePage(${id})`);
        const submissionIndex = submissions.findIndex(submission => submission.id === id);
        if (submissionIndex !== -1) {
            submissions[submissionIndex].disclosure = details;
            submissions[submissionIndex].lastStepVisited = 'disclosure';
            return submissions[submissionIndex];
        }
        throw new Error('could not find submission with id: ' + id);
    };
};
