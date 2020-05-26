import { logger } from '../logger';
export const getSubmissions = (submissions: Array<{}>): (() => Array<{}>) => (): object[] => {
    logger.info(`getSubmissions()`);
    return submissions;
};
