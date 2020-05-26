import { Request, Response } from 'express';
import getMockData from '../getMockData';
import { logger } from '../logger';

export const GetPerson = () => (req: Request, res: Response): void => {
    logger.info(`GetPerson()`);
    const profile = getMockData('person.json');
    res.json(profile);
};

export const GetPeople = () => (req: Request, res: Response): void => {
    logger.info(`GetPeople(${req.query.type})`);
    let items;
    const role = req.query.type ? req.query.type[0] : '';
    if (role == 'reviewing-editor') {
        items = getMockData('reviewing-editors.json');
    } else if (role == 'senior-editor') {
        items = getMockData('senior-editors.json');
    } else {
        items = [];
    }
    res.json({ items, total: items.length });
};
