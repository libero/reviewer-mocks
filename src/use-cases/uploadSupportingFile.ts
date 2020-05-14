import { getCurrentUser } from './userApi';
import { FileStatus, FileType, File } from './types';
import { wait } from '../utils';
import { PubSub } from 'apollo-server-express';
import { v4 } from 'uuid';

export const uploadSupportingFile = (
    submissions,
    pubsub: PubSub = new PubSub(), // set default so it won't break existing code
): ((_, { id, file, fileSize }) => Promise<File>) => async (_, { id, file }): Promise<File> => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = getCurrentUser();

    const { filename } = await file;

    if (submissionIndex !== -1) {
        const submission = submissions[submissionIndex];
        const supportingFile: File = {
            id: v4(),
            type: FileType.SUPPORTING_FILE,
            filename: filename,
            url: 'http://localhost/bucket/name.pdf',
            mimeType: 'application/pdf',
            size: 1000,
            status: FileStatus.UPLOADED,
            downloadLink: 'http://localhost/bucket/name.pdf',
        };
        if (submission.files) {
            submission.files.supportingFiles = submission.files.supportingFiles
                ? [...submission.files.supportingFiles, supportingFile]
                : [supportingFile];
        } else {
            submission.files = {
                supportingFiles: [supportingFile],
            };
        }
        for await (const percentage of [0, 25, 50, 75, 100]) {
            await wait(100);
            await pubsub.publish('UPLOAD_STATUS', {
                fileUploadProgress: {
                    submissionId: submission.id,
                    userId: user.id,
                    filename: supportingFile.filename,
                    fileId: supportingFile.id,
                    percentage,
                    type: FileType.SUPPORTING_FILE,
                },
            });
        }
        return supportingFile;
    }

    throw new Error("can't find submission: " + id);
};
