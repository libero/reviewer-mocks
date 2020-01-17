import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const GetPerson = () => (req: Request, res: Response): void => {
    const profile = getMockData('person.json');
    res.json(profile);
};
