import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { ConfigType } from '../config';

export const JournalSubmit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const journalUserData = getMockData('journalUser.json');
    const token = sign(journalUserData, config.continuum_jwt_secret, {
        expiresIn: '1d',
    });

    const redirectUrl = `${config.continuum_return_url}#${token}`;

    resp.redirect(redirectUrl);
};
