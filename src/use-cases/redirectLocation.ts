import { Request, Response } from 'express';
import { logger } from '../logger';

export const RedirectLocation = () => (req: Request, resp: Response): void => {
    logger.info(`RedirectLocation()`);
    resp.status(200).send('Redirect reached successfully');
};
