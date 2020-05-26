import { v4 } from 'uuid';
import { logger } from '../logger';

export const startSubmission = (submissions): ((_, { articleType }) => {}) => (_, { articleType }): {} => {
    logger.info(`startSubmission(${articleType})`);
    const submission = {
        id: v4(),
        updated: new Date().toISOString(),
        articleType,
        status: 'INITIAL',
        createdBy: 'userId',
        files: {
            supportingFiles: [],
        },
    };
    submissions.push(submission);
    return submission;
};
