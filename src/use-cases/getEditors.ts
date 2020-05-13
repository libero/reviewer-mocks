import { Request, Response } from 'express';
import getMockData from '../getMockData';

export const GetEditors = (role: string) => (req: Request, res: Response): void => {
    let editors: object[] = [];
    if (role == 'seniorEditors') {
        editors = getMockData('seniorEditors.json') as Array<object>;
    } else if (role == 'reviewingEditors') {
        editors = getMockData('reviewingEditors.json') as Array<object>;
    }

    res.json(editors);
};
