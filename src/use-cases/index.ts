import { Request, Response } from 'express';

export * from './journalSubmit';
export * from './authenticate';

export const HealthCheck = () => (req: Request, res: Response): void => {
    res.json({ ok: true });
};
