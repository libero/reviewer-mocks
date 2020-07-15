import { logger } from '../logger';
export const saveEditorPage = (
    submissions: Array<{ id: string; lastStepVisited: string; editorDetails: {} }>,
): ((_, { id, details }) => {}) => (_, { id, details = {} }): {} => {
    logger.info(`saveEditorPage(${id})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        submission.editorDetails = details;
        submission.lastStepVisited = `/submit/${submission.id}/editors`;
        return submission;
    }
    throw new Error('could not find submission with id: ' + id);
};
