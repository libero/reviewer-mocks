enum FileStatus {
    CREATED = 'CREATED',
    UPLOADED = 'UPLOADED',
    STORED = 'STORED',
    CANCELLED = 'CANCELLED',
}

enum FileType {
    MANUSCRIPT_SOURCE_PENDING = 'MANUSCRIPT_SOURCE_PENDING',
    MANUSCRIPT_SOURCE = 'MANUSCRIPT_SOURCE',
    SUPPORTING_FILE = 'SUPPORTING_FILE',
}

type File = {
    id: string;
    type: string;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    status: string;
};

type Submission = {
    id: string;
    title: string;
    updated: Date;
    articleType: string;
    status: string;
    createdBy: string;
    files: {
        manuscriptFile?: File;
    };
};

export const uploadManuscript = (submissions): ((_, { id, file, fileSize }) => Promise<Submission>) => async (
    _,
    { id, file },
): Promise<Submission> => {
    const submissionIndex = submissions.findIndex(submission => submission.id === id);

    // file = { path: '...' } only
    if (submissionIndex !== -1) {
        const manuscriptFile: File = {
            id: '0ee77f61-b89d-40cd-893e-88089359eb6b',
            type: FileType.MANUSCRIPT_SOURCE,
            filename: file.path,
            url: 'http://localhost/bucket/name.pdf',
            mimeType: 'application/pdf',
            size: 1000,
            status: FileStatus.UPLOADED,
        };
        submissions[submissionIndex].files
            ? (submissions[submissionIndex].files.manuscriptFile = manuscriptFile)
            : (submissions[submissionIndex].files = { manuscriptFile });
        return submissions[submissionIndex];
    }

    throw new Error("can't find submission: " + id);
};
