import { logger } from '../logger';
export const saveFilesPage = (
    submissions: Array<{ id: string; lastStepVisited: string; files: { coverLetter: string } }>,
): ((_, { id, coverLetter }) => {}) => (_, { id, coverLetter = '' }): {} => {
    logger.info(`saveFilesPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].files
            ? (submissions[submissionIndex].files.coverLetter = coverLetter)
            : (submissions[submissionIndex].files = { coverLetter });
        submissions[submissionIndex].lastStepVisited = 'files';
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
