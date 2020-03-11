import { Request, Response } from 'express';

export * from './journalSubmit';
export * from './authenticate';
export * from './getSubmissions';
export * from './getSubmission';
export * from './startSubmission';
export * from './deleteSubmission';
export * from './getProfile';
export * from './getPerson';
export * from './getCurrentUser';
export * from './redirectLocation';
export * from './saveAuthorPage';
export * from './saveFilesPage';
export * from './saveDetailsPage';
export * from './uploadManuscript';

export const HealthCheck = () => (req: Request, res: Response): void => {
    res.json({ ok: true });
};
