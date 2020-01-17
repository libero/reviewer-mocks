import { Request, Response } from 'express';
import { GetPerson } from './getPerson';

describe('get person', (): void => {
    it('returns a person', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        GetPerson()(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof (mockResponse.json as jest.Mock).mock.calls[0][0]).toBe('object');
    });
});
