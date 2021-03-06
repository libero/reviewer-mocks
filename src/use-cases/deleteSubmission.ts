import { logger } from '../logger';
export const deleteSubmission = (submissions): ((_, { id }) => string | undefined) => (
    _,
    { id },
): string | undefined => {
    logger.info(`deleteSubmission(${id})`);

    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions.splice(submissionIndex, 1);
        return id;
    }

    throw new Error("can't find submission: " + id);
};
