import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { ConfigType } from '../config';
import { logger } from '../logger';

export const JournalSubmit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    logger.info(`JournalSubmit()`);
    const journalUserData = getMockData('journalUser.json');
    const token = sign(journalUserData, config.continuum_jwt_secret, {
        expiresIn: '1d',
    });

    const redirectUrl = `${config.continuum_return_url}?token=${token}`;

    resp.redirect(redirectUrl);
};
