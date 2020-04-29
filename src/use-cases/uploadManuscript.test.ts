import { uploadManuscript } from './uploadManuscript';

describe('uploadManuscript', (): void => {
    it('Uploads a manuscript file if submission exists', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        const submission = await uploadManuscript(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submission).toBeTruthy();
        expect(submission.files?.manuscriptFile?.url).toBe('http://localhost/bucket/name.pdf');
    });

    it('Returns suggestions after upload', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        const submission = await uploadManuscript(submissions)(null, {
            id: 'A',
            fileSize: 40,
            file: {},
        });
        expect(submission).toBeTruthy();
        expect(submission.files?.manuscriptFile?.url).toBe('http://localhost/bucket/name.pdf');
        expect(submission).toHaveProperty('suggestions');
        expect(submission.suggestions).toHaveLength(1);
        expect(submission.suggestions[0]).toHaveProperty('fieldName');
        expect(submission.suggestions[0].fieldName).toBe('title');
        expect(submission.suggestions[0]).toHaveProperty('value');
        expect(submission.suggestions[0].value).toBe('My first Manuscript');
    });

    it('Throws if submission does not exist', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        await expect(uploadManuscript(submissions)(null, { id: 'C', fileSize: 40, file: {} })).rejects.toThrowError(
            "can't find submission: C",
        );
    });

    it('adds the manuscriptFile to the in memory submission object', async (): Promise<void> => {
        const submissions: { id: string; files?: { manuscriptFile?: {} } }[] = [{ id: 'A' }];
        await uploadManuscript(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submissions[0].files?.manuscriptFile).toBeDefined();
    });
});
