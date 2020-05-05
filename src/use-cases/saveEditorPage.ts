export const saveEditorPage = (
    submissions: Array<{ id: string; editorDetails: {} }>,
): ((_, { id, editorDetails }) => {}) => (_, { id, editorDetails = {} }): {} => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].editorDetails = editorDetails;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
