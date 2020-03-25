import { uploadSupportingFile } from './uploadSupportingFile';

describe('uploadSupportingFile', (): void => {
    it('Uploads a support file if submission exists', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        const submission = await uploadSupportingFile(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submission).toBeTruthy();
        const supportingFile = submission.files?.supportingFiles ? submission.files?.supportingFiles[0] : null;
        expect(supportingFile?.url).toBe('http://localhost/bucket/name.pdf');
    });

    it('Throws if submission does not exist', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        await expect(uploadSupportingFile(submissions)(null, { id: 'C', fileSize: 40, file: {} })).rejects.toThrowError(
            "can't find submission: C",
        );
    });

    it('adds the supporting to the in memory submission object', async (): Promise<void> => {
        const submissions: { id: string; files?: { supportingFiles?: [] } }[] = [{ id: 'A' }];
        await uploadSupportingFile(submissions)(null, { id: 'A', fileSize: 40, file: {} });
        expect(submissions[0].files?.supportingFiles).toBeDefined();
    });
});
