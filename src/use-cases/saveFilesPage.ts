import { MockSubmissionRepo } from './types';

export const saveFilesPage = (submissions: MockSubmissionRepo): ((_, { id, coverLetter }) => {}) => (
    _,
    { id, coverLetter = '' },
): object => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex].files
            ? (submissions[submissionIndex].files.coverLetter = coverLetter)
            : (submissions[submissionIndex].files = { coverLetter });
        submissions[submissionIndex].suggestions = [{ fieldName: 'title', value: 'My first Manuscript' }];
        return submissions[submissionIndex];
    }
    throw new Error('could not find submission with id: ' + id);
};
