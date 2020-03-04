import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const getCurrentUser = (): object => {
    return getMockData('currentUser.json');
};

export const getCurrentUserREST = () => (req: Request, res: Response): void => {
    res.json(getCurrentUser());
};
