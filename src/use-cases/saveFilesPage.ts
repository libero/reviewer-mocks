import { logger } from '../logger';
export const saveFilesPage = (
    submissions: Array<{ id: string; lastStepVisited: string; files: { coverLetter: string } }>,
): ((_, { id, coverLetter }) => {}) => (_, { id, coverLetter = '' }): {} => {
    logger.info(`saveFilesPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        submission.files ? (submission.files.coverLetter = coverLetter) : (submission.files = { coverLetter });
        submission.lastStepVisited = `/submit/${submission.id}/files`;
        return submission;
    }
    throw new Error('could not find submission with id: ' + id);
};
