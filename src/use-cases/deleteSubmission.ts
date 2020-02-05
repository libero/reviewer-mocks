export const deleteSubmission = (submissions): ((id) => string | undefined) => (id): string | undefined => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions = submissions.splice(submissionIndex, 1);
        return id;
    }

    throw new Error("can't find submission: " + id);
};
