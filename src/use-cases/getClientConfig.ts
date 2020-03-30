import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const getClientConfig = () => (req: Request, res: Response): void => {
    res.json(getMockData('configClient.json'));
};
