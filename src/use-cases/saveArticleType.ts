import { logger } from '../logger';
export const saveArticleType = (
    submissions: Array<{ id: string; lastStepVisited: string; articleType: string }>,
): ((_, { id, articleType }) => {}) => (_, { id, articleType = {} }): {} => {
    logger.info(`saveArticleType(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        submission.articleType = articleType;
        return submission;
    }
    throw new Error('could not find submission with id: ' + id);
};
