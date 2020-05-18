import { Request, Response } from 'express';
import { GetPerson, GetPeople } from './getPerson';

describe('get person', (): void => {
    it('returns a person', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        GetPerson()(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof (mockResponse.json as jest.Mock).mock.calls[0][0]).toBe('object');
    });
    it('returns senior-editors', (): void => {
        const mockRequest: Request = { query: { type: ['senior-editor'] } } as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        GetPeople()(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof (mockResponse.json as jest.Mock).mock.calls[0][0]).toBe('object');
        const people = (mockResponse.json as jest.Mock).mock.calls[0][0].items;
        expect(people).toHaveLength(2);
        expect(people[0]).toMatchObject({
            id: '9000001',
            type: {
                id: 'senior-editor',
                label: 'Senior Editor',
            },
            name: {
                surname: 'Tt',
                givenNames: 'Jj',
                preferred: 'Jj Tt',
                index: 'Tt, Jj',
            },
        });
        expect(people[1]).toMatchObject({
            id: '9000002',
            type: {
                id: 'senior-editor',
                label: 'Senior Editor',
            },
            name: {
                surname: 'Ww',
                givenNames: 'Aa',
                preferred: 'Aa Ww',
                index: 'Ww, Aa',
            },
        });
    });
    it('returns reviewing-editors', (): void => {
        const mockRequest: Request = { query: { type: ['reviewing-editor'] } } as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        GetPeople()(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof (mockResponse.json as jest.Mock).mock.calls[0][0]).toBe('object');
        const people = (mockResponse.json as jest.Mock).mock.calls[0][0].items;
        expect(people).toHaveLength(2);
        expect(people[0]).toMatchObject({
            id: 'a0000001',
            type: {
                id: 'reviewing-editor',
                label: 'Reviewing Editor',
            },
            name: {
                surname: 'Zz',
                givenNames: 'Ww',
                preferred: 'Ww Zz',
                index: 'Zz, Ww',
            },
        });
        expect(people[1]).toMatchObject({
            id: 'a0000002',
            type: {
                id: 'reviewing-editor',
                label: 'Reviewing Editor',
            },
            name: {
                surname: 'Zz',
                givenNames: 'Mía Mm',
                preferred: 'Mía Mm Zz',
                index: 'Zz, Mía Mm',
            },
        });
    });
});
