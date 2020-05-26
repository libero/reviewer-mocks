import { getEditorsForUserApi } from './userApi';
import { logger } from '../logger';

export const getEditors = (): ((_, { role: string }) => {}) => (_, { role }): {} => {
    logger.info(`getEditors(${role})`);

    return getEditorsForUserApi(role);
};
