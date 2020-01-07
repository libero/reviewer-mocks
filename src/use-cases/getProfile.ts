import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const GetProfile = () => (req: Request, res: Response): void => {
    const profile = getMockData('profile.json');
    res.json(profile);
};
