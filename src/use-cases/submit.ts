import { logger } from '../logger';
export const submit = (submissions: Array<{ id: string; status: string }>): ((_, { id }) => {}) => (_, { id }): {} => {
    logger.info(`saveDetailsPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].status = 'SUBMITTED';
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
