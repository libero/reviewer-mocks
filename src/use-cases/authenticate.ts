import { Request, Response } from 'express';
import authenticatedUserData from '../data/authenticatedUser.json';
import { ConfigType } from '../config';

export const Authenticate = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const token = sign(authenticatedUserData, config.continuumAuthJwtSecret, {
        expiresIn: '1d',
    });

    const redirectUrl = config.continuumAuthRedirectUrl + '#' + token;

    resp.redirect(redirectUrl);
};
