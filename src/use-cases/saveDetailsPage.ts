export const saveDetailsPage = (submissions: Array<{ id: string; details: {} }>): ((_, { id, details }) => {}) => (
    _,
    { id, details = {} },
): {} => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].details = details;
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
