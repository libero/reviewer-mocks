export const saveDetailsPage = (
    submissions: Array<{ id: string; author: {} }>,
): ((
    _,
    {
        id: string,
        details: {},
    },
) => {}) => (_, { id, details }): {} => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].author = details;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};