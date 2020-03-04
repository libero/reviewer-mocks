import { uploadManuscript } from './uploadManuscript';

describe('uploadManuscript', (): void => {
    it('Uploads a manuscript file if submission exists', (): void => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        const submission = uploadManuscript(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submission).toBeTruthy();
        expect(submission.manuscriptFile?.url).toBe('http://localhost/bucket/name.pdf');
    });

    it('Throws if submission does not exist', (): void => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        expect(() => uploadManuscript(submissions)(null, { id: 'C', fileSize: 40, file: {} })).toThrowError();
    });
});
