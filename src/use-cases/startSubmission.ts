import { v4 } from 'uuid';
import { logger } from '../logger';

export const startSubmission = (submissions): ((_, { articleType }) => {}) => (_, { articleType }): {} => {
    logger.info(`startSubmission(${articleType})`);
    const submissionId = v4();
    const submission = {
        id: submissionId,
        updated: new Date().toISOString(),
        articleType,
        status: 'CONTINUE_SUBMISSION',
        createdBy: 'userId',
        lastStepVisited: `/submit/${submissionId}/author`,
        files: {
            supportingFiles: [],
        },
    };
    submissions.push(submission);
    return submission;
};
