export const deleteSupportingFile = (submissions): ((_, { fileId, submissionId }) => Promise<string>) => async (
    _,
    { fileId, submissionId },
): Promise<string> => {
    const submissionIndex = submissions.findIndex(submission => submission.id === submissionId);

    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        if (submission.files && submission.files.supportingFiles) {
            submission.files.supportingFiles = submission.files.supportingFiles.filter(file => file.id !== fileId);
        } else {
            throw new Error('No supporting files to delete');
        }
        return fileId;
    }

    throw new Error("can't find submission: " + submissionId);
};
