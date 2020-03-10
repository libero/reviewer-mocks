import { uploadManuscript } from './uploadManuscript';

describe('uploadManuscript', (): void => {
    it('Uploads a manuscript file if submission exists', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        const submission = await uploadManuscript(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submission).toBeTruthy();
        expect(submission.manuscriptFile?.url).toBe('http://localhost/bucket/name.pdf');
    });

    it('Throws if submission does not exist', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        await expect(uploadManuscript(submissions)(null, { id: 'C', fileSize: 40, file: {} })).rejects.toThrowError(
            "can't find submission: C",
        );
    });
});
