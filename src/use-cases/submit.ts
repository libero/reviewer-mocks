import { Request, Response } from 'express';
import { ConfigType } from '../config';

export const Submit = (config: ConfigType, sign) => (req: Request, resp: Response): void => {
    const token = sign(
        {
            iss: 'journal--prod',
            id: 'ewwboc7m',
            'new-session': true,
        },
        config.continuumLoginJwtSecret,
        {
            expiresIn: '1d',
        },
    );

    resp.redirect(`${config.authenticationUrl}/authenticate/${token}`);
};
