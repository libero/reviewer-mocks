import { Request, Response } from 'express';
import profile from '../mock-data/profile.json';

export const GetProfile = () => (req: Request, res: Response): void => {
    res.json(profile);
};
