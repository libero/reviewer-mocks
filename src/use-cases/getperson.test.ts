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
        expect(people).toHaveLength(6);
        expect(people[0]).toMatchObject({
            id: '9000011',
            type: {
                id: 'senior-editor',
                label: 'Senior Editor',
            },
            name: {
                surname: 'Tt2',
                givenNames: 'Jj',
                preferred: 'Jj Tt2',
                index: 'Tt, Jj',
            },
        });
        expect(people[1]).toMatchObject({
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
        expect(people[2]).toMatchObject({
            id: '9000012',
            type: {
                id: 'senior-editor',
                label: 'Senior Editor',
            },
            name: {
                surname: 'Ww2',
                givenNames: 'Aa',
                preferred: 'Aa Ww2',
                index: 'Ww, Aa',
            },
        });
        expect(people[3]).toMatchObject({
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
        expect(people).toHaveLength(7);
        expect(people[0]).toMatchObject({
            id: 'a0000011',
            type: {
                id: 'reviewing-editor',
                label: 'Reviewing Editor',
            },
            name: {
                surname: 'Zz2',
                givenNames: 'Ww',
                preferred: 'Ww Zz2',
                index: 'Zz, Ww',
            },
        });
        expect(people[1]).toMatchObject({
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
        expect(people[2]).toMatchObject({
            id: 'a0000012',
            type: {
                id: 'reviewing-editor',
                label: 'Reviewing Editor',
            },
            name: {
                surname: 'Zz2',
                givenNames: 'Mía Mm',
                preferred: 'Mía Mm Zz2',
                index: 'Zz, Mía Mm',
            },
        });
        expect(people[3]).toMatchObject({
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
