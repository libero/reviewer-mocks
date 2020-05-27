import { logger } from '../logger';
export const saveEditorPage = (submissions: Array<{ id: string; editorDetails: {} }>): ((_, { id, details }) => {}) => (
    _,
    { id, details = {} },
): {} => {
    logger.info(`saveEditorPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].editorDetails = details;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
