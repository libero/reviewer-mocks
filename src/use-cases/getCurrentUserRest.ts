import getMockData from '../getMockData';
import { Request, Response } from 'express';

export const getCurrentUserRest = () => (req: Request, res: Response): void => {
    const user = getMockData('currentUser.json');
    console.log('user: ', user);
    res.json(user);
};
