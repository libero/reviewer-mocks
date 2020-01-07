import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { ConfigType } from '../config';

export const Authenticate = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const authenticatedUserData = getMockData('authenticatedUser.json');
    const token = sign(authenticatedUserData, config.authentication_jwt_secret, {
        expiresIn: '1d',
    });

    const redirectUrl = config.login_return_url + '#' + token;

    resp.redirect(redirectUrl);
};
