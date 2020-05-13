import { Request, Response } from 'express';
import { getEditors } from './getEditors';

describe('get editors', (): void => {
    it('returns a list of senior editors', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        getEditors('seniorEditors')(mockRequest, mockResponse);

        const response = (mockResponse.json as jest.Mock).mock.calls[0][0];
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(response).toHaveLength(3);
        expect(response[0]).toHaveProperty('id');
        expect(response[0].id).toBe('0aa30b85');

        expect(response[0]).toHaveProperty('name');
        expect(response[0].name).toBe('Reviewer1');

        expect(response[0]).toHaveProperty('aff');
        expect(response[0].aff).toBe('Rev1 Uni');

        expect(response[0]).toHaveProperty('focuses');
        expect(response[0].focuses).toHaveLength(2);

        expect(response[0]).toHaveProperty('expertises');
        expect(response[0].expertises).toHaveLength(2);
    });
    it('returns a list of reviewing editors', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        getEditors('reviewingEditors')(mockRequest, mockResponse);

        const response = (mockResponse.json as jest.Mock).mock.calls[0][0];
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(response).toHaveLength(3);
        expect(response[1]).toHaveProperty('id');
        expect(response[1].id).toBe('007');

        expect(response[1]).toHaveProperty('name');
        expect(response[1].name).toBe('James Bond');

        expect(response[1]).toHaveProperty('aff');
        expect(response[1].aff).toBe('MI6');

        expect(response[1]).toHaveProperty('focuses');
        expect(response[1].focuses).toHaveLength(2);

        expect(response[1]).toHaveProperty('expertises');
        expect(response[1].expertises).toHaveLength(2);
    });
});
