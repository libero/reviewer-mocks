import { Request, Response } from 'express';

export * from './journalSubmit';
export * from './authenticate';
export * from './getSubmissions';
export * from './startSubmission';
export * from './getProfile';
export * from './getCurrentProfile';

export const HealthCheck = () => (req: Request, res: Response): void => {
    res.json({ ok: true });
};
