import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const GetPerson = () => (req: Request, res: Response): void => {
    const profile = getMockData('person.json');
    res.json(profile);
};

export const GetPeople = () => (req: Request, res: Response): void => {
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
