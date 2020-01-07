import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { ConfigType } from '../config';

export const JournalSubmit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const journalUserData = getMockData('journalUser.json');
    const token = sign(journalUserData, config.continuumLoginJwtSecret, {
        expiresIn: '1d',
    });

    const redirectUrl = `${config.continuumLoginRedirectUrl}#${token}`;

    resp.redirect(redirectUrl);
};
