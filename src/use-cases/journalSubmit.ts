import { Request, Response } from 'express';
import journalUserData from '../data/journalUser.json';
import { ConfigType } from '../config';

export const JournalSubmit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const token = sign(journalUserData, config.continuumLoginJwtSecret, {
        expiresIn: '1d',
    });

    const redirectUrl =
        config.continuumLoginRedirectUrl + (config.continuumLoginRedirectUrl.endsWith('/') ? '' : '/') + token;

    resp.redirect(redirectUrl);
};
