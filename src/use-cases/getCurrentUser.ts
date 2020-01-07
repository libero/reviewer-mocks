import { Request, Response } from 'express';
import currentUser from '../mock-data/currentUser.json';

export const GetCurrentUser = () => (req: Request, res: Response): void => {
    res.json(currentUser);
};
