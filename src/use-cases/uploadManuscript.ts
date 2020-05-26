import { PubSub } from 'apollo-server-express';
import { getCurrentUser } from './userApi';
import { FileStatus, FileType, File, Submission } from './types';
import { wait } from '../utils';
import { logger } from '../logger';

export const uploadManuscript = (
    submissions,
    pubsub: PubSub = new PubSub(), // set default so it won't break existing code
): ((_, { id, file, fileSize }) => Promise<Submission>) => async (_, { id, file }): Promise<Submission> => {
    logger.info(`uploadManuscript(${id}, ${JSON.stringify(file)})`);
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = getCurrentUser();

    const { filename } = await file;

    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        const manuscriptFile: File = {
            id: '0ee77f61-b89d-40cd-893e-88089359eb6b',
            type: FileType.MANUSCRIPT_SOURCE,
            filename: filename,
            url: 'http://localhost/bucket/name.pdf',
            mimeType: 'application/pdf',
            size: 1000,
            status: FileStatus.UPLOADED,
            downloadLink: 'http://localhost/bucket/name.pdf',
        };
        submission.files ? (submission.files.manuscriptFile = manuscriptFile) : (submission.files = { manuscriptFile });
        for await (const percentage of [0, 25, 50, 75, 100]) {
            await wait(500);
            await pubsub.publish('UPLOAD_STATUS', {
                fileUploadProgress: {
                    submissionId: submission.id,
                    userId: user.id,
                    filename: manuscriptFile.filename,
                    fileId: manuscriptFile.id,
                    percentage,
                    type: FileType.MANUSCRIPT_SOURCE,
                },
            });
        }
        submissions[submissionIndex].suggestions = [{ fieldName: 'title', value: 'My first Manuscript' }];
        return submission;
    }

    throw new Error("can't find submission: " + id);
};
