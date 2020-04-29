import { v4 } from 'uuid';
import { saveFilesPage } from './saveFilesPage';
import { MockSubmissionRepo } from './types';

describe('saveFilesPage', (): void => {
    it('save files returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions: MockSubmissionRepo = [
            {
                id: v4(),
                files: { coverLetter: '' },
                suggestions: [],
            },
        ];

        const badRequest = (): object => saveFilesPage(submissions)(null, { id: submissionId, coverLetter: 'test' });
        expect(badRequest).toThrow();
    });
    it('save on files page produces a suggestion', (): void => {
        const submissionId = v4();
        const submissions: MockSubmissionRepo = [{ id: submissionId, files: { coverLetter: '' }, suggestions: [] }];
        saveFilesPage(submissions)(null, { id: submissionId, coverLetter: 'test' });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].suggestions).toHaveLength(1);
        expect(submissions[0].suggestions[0]).toHaveProperty('fieldName');
        expect(submissions[0].suggestions[0].fieldName).toBe('title');
        expect(submissions[0].suggestions[0]).toHaveProperty('value');
        expect(submissions[0].suggestions[0].value).toBe('My first Manuscript');
    });
    it('save coverLetter of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                files: { coverLetter: '' },
                suggestions: [],
            },
        ];
        expect(submissions[0].files.coverLetter).toBe('');
        saveFilesPage(submissions)(null, { id: submissionId, coverLetter: 'test' });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].files.coverLetter).toBe('test');
    });
    it('save coverLetter of a submission if it has no files property', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
            },
        ];
        saveFilesPage(submissions as MockSubmissionRepo)(null, {
            id: submissionId,
            coverLetter: 'test',
        });

        expect(submissions).toHaveLength(1);
        expect((submissions[0] as { id: string; files: { coverLetter: string } }).files.coverLetter).toBe('test');
    });
});
