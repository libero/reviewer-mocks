export const deleteSupportingFile = (submissions): ((_, { fileId, submissionId }) => Promise<boolean>) => async (
    _,
    { fileId, submissionId },
): Promise<boolean> => {
    const submissionIndex = submissions.findIndex(submission => submission.id === submissionId);

    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        if (submission.files && submission.files.supportingFiles) {
            submission.files.supportingFiles = submission.files.supportingFiles.filter(file => file.id !== fileId);
        } else {
            throw new Error('No supporting files to delete');
        }
        return true;
    }

    throw new Error("can't find submission: " + submissionId);
};
