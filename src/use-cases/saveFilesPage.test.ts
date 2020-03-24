import { v4 } from 'uuid';
import { saveFilesPage } from './saveFilesPage';

describe('saveFilesPage', (): void => {
    it('save files returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                files: { coverLetter: '' },
            },
        ];

        const badRequest = (): object => saveFilesPage(submissions)(null, { id: submissionId, coverLetter: 'test' });
        expect(badRequest).toThrow();
    });
    it('save coverLetter of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                files: { coverLetter: '' },
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
        saveFilesPage(submissions as Array<{ id: string; files: { coverLetter: string } }>)(null, {
            id: submissionId,
            coverLetter: 'test',
        });
        expect(submissions).toHaveLength(1);
        expect((submissions[0] as { id: string; files: { coverLetter: string } }).files.coverLetter).toBe('test');
    });
});
