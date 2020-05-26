import { logger } from '../logger';
export const saveDetailsPage = (
    submissions: Array<{ id: string; manuscriptDetails: {} }>,
): ((_, { id, details }) => {}) => (_, { id, details = {} }): {} => {
    logger.info(`saveDetailsPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].manuscriptDetails = details;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
