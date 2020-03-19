import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const extractScienceBeam = () => (req: Request, res: Response): void => {
    const scienceBeam = getMockData('scienceBeam.json') as { result: string };

    res.contentType('text/xml').send(scienceBeam.result);
};
