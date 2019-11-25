export const getSubmission = (submissions: {}): (() => Array<{}>) => () => {
    return submissions[0];
};
