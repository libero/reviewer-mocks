export enum FileStatus {
    CREATED = 'CREATED',
    UPLOADED = 'UPLOADED',
    STORED = 'STORED',
    CANCELLED = 'CANCELLED',
}

export enum FileType {
    MANUSCRIPT_SOURCE_PENDING = 'MANUSCRIPT_SOURCE_PENDING',
    MANUSCRIPT_SOURCE = 'MANUSCRIPT_SOURCE',
    SUPPORTING_FILE = 'SUPPORTING_FILE',
}

export type File = {
    id: string;
    type: string;
    filename: string;
    url: string;
    mimeType: string;
    size: number;
    status: string;
};

export type Suggestion = {
    fieldName: string;
    value: string;
};

export type Submission = {
    id: string;
    title: string;
    updated: Date;
    articleType: string;
    status: string;
    createdBy: string;
    files: {
        manuscriptFile?: File;
        supportingFiles?: Array<File>;
    };
    suggestions: Array<Suggestion>;
};
