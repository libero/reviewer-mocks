import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const getCurrentUser = (): object => {
    return getMockData('currentUser.json');
};

export const getEditorsForUserApi = (role: string): object[] => {
    let editors: object[] = [];
    if (role == 'seniorEditors') {
        editors = getMockData('seniorEditors.json') as Array<object>;
    } else if (role == 'reviewingEditors') {
        editors = getMockData('reviewingEditors.json') as Array<object>;
    }
    return editors;
};

export const getSubFromAuthorizationHeader = (header: string): string => {
    /* This routine doesn't validate the token. Just decodes it and returns the user id that
       tests can request a different user than the default to test resource ownership.
       @todo: is this repository needed in the long run?
    */
    const jwt = header.split(' ')[1];
    const token = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
    return token.sub;
};

export const userApiGetCurrentUser = () => (req: Request, res: Response): void => {
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
    res.json(getEditorsForUserApi(role));
};
