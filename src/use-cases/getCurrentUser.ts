import { Request, Response } from 'express';
import currentUser from '../mock-data/currentUser.json';

export const getCurrentUser = () => (req: Request, res: Response): void => {
    res.json(currentUser);
};
