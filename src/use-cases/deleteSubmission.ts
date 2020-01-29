export const deleteSubmission = (submissions): ((id) => boolean) => (id): boolean => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions = submissions.splice(submissionIndex, 1);
        return true;
    }
    return false;
};
