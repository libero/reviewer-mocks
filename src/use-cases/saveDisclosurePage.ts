import { logger } from '../logger';

export const saveDisclosurePage = (
    submissions: Array<{ id: string; lastStepVisited: string; disclosure: {} }>,
): ((_, { id, details }) => {}) => {
    return (_, { id, details = {} }): {} => {
        logger.info(`saveDisclosurePage(${id})`);
        const submissionIndex = submissions.findIndex(submission => submission.id === id);
        if (submissionIndex !== -1) {
            const submission = submissions[submissionIndex];
            submission.disclosure = details;
            submission.lastStepVisited = `/submit/${submission.id}/disclosure`;
            return submission;
        }
        throw new Error('could not find submission with id: ' + id);
    };
};
