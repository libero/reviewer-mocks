import { logger } from '../logger';
export const saveDetailsPage = (
    submissions: Array<{ id: string; lastStepVisited: string; manuscriptDetails: {} }>,
): ((_, { id, details }) => {}) => (_, { id, details = {} }): {} => {
    logger.info(`saveDetailsPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        submission.manuscriptDetails = details;
        submission.lastStepVisited = `/submit/${submission.id}/details`;
        return submission;
    }
    throw new Error('could not find submission with id: ' + id);
};
