import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const getCurrentUser = (): object => {
    return getMockData('currentUser.json');
};

export const getCurrentUserREST = () => (req: Request, res: Response): void => {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
        try {
            const token = JSON.parse(Buffer.from(header, 'base64').toString());
            res.json({ ...getCurrentUser(), id: token.sub });
        } catch (e) {}
    }
    res.json(getCurrentUser());
};
