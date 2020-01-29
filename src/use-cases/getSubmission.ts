export const getSubmission = (submissions: Array<{ id: string }>): ((id: string) => {}) => (id): {} => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
