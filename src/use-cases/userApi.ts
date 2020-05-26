import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { logger } from '../logger';

export const getCurrentUser = (): object => {
    logger.info(`getCurrentUser()`);
    return getMockData('currentUser.json');
};

export const getEditorsForUserApi = (role: string): object[] => {
    logger.info(`getEditorsForUserApi(${role})`);
    let editors: object[] = [];
    if (role == 'seniorEditor') {
        editors = getMockData('seniorEditors.json') as Array<object>;
    } else if (role == 'reviewingEditor') {
        editors = getMockData('reviewingEditors.json') as Array<object>;
    }
    return editors;
};

export const getSubFromAuthorizationHeader = (header: string): string => {
    /* This routine doesn't validate the token. Just decodes it and returns the user id that
       tests can request a different user than the default to test resource ownership.
       @todo: is this repository needed in the long run?
    */
    logger.info(`getSubFromAuthorizationHeader(${header})`);
    const jwt = header.split(' ')[1];
    const token = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    return token.sub;
};

export const userApiGetCurrentUser = () => (req: Request, res: Response): void => {
    logger.info(`userApiGetCurrentUser()`);
    const authorization = req.headers.authorization;
    if (typeof authorization !== 'undefined') {
        try {
            res.json({ ...getCurrentUser(), id: getSubFromAuthorizationHeader(authorization) });
            return;
        } catch (e) {}
    }
    res.json(getCurrentUser());
};

export const userApiGetEditors = () => (req: Request, res: Response): void => {
    const role = req.query.role;
    logger.info(`userApiGetEditors(${role})`);
    res.json(getEditorsForUserApi(role));
};
