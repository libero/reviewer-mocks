import { Request, Response } from 'express';
import journalUserData from '../mock-data/journalUser.json';
import { ConfigType } from '../config';

export const JournalSubmit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const token = sign(journalUserData, config.continuum_jwt_secret, {
        expiresIn: '1d',
    });

    const redirectUrl = `${config.continuum_return_url}#${token}`;

    resp.redirect(redirectUrl);
};
