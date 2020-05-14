import { getEditorsForUserApi } from './userApi';

export const getEditors = (): ((_, { role: string }) => {}) => (_, { role }): {} => {
    return getEditorsForUserApi(role);
};
