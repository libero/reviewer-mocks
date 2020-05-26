import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { logger } from '../logger';

export const GetProfile = () => (req: Request, res: Response): void => {
    logger.info(`GetProfile()`);

    const profile = getMockData('profile.json');
    res.json(profile);
};
