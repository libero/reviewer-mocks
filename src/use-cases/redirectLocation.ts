import { Request, Response } from 'express';

export const RedirectLocation = () => (req: Request, resp: Response): void => {
    resp.status(200).send('Redirect reached successfully');
};
