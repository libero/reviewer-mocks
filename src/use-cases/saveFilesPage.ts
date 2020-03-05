export const saveFilesPage = (
    submissions: Array<{ id: string; coverLetter: string }>,
): ((_, { id, coverLetter }) => {}) => (_, { id, coverLetter = '' }): {} => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].coverLetter = coverLetter;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
