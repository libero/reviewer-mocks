import { deleteSupportingFile } from './deleteSupportingFile';

describe('deleteSupportingFile', (): void => {
    it('deletes a supporting file if submission exists', async (): Promise<void> => {
        const submissions = [
            {
                id: 'A',
                files: {
                    supportingFiles: [
                        {
                            id: 'someID',
                        },
                    ],
                },
            },
        ];
        const success = await deleteSupportingFile(submissions)(null, { fileId: 'someID', submissionId: 'A' });
        expect(success).toBe('someID');
        const supportingFiles = submissions[0].files?.supportingFiles;
        expect(supportingFiles).toHaveLength(0);
    });

    it('Throws if submission does not exist', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        await expect(
            deleteSupportingFile(submissions)(null, { fileId: 'blah', submissionId: 'apple' }),
        ).rejects.toThrowError("can't find submission: apple");
    });

    it('Throws if there are no supporting files', async (): Promise<void> => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        await expect(
            deleteSupportingFile(submissions)(null, { fileId: 'blah', submissionId: 'A' }),
        ).rejects.toThrowError('No supporting files to delete');
    });
});
