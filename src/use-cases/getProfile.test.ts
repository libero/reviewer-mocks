import { Request, Response } from 'express';
import { GetProfile } from './getProfile';

describe('getProfile', (): void => {
    it('returns a profile', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        GetProfile()(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof (mockResponse.json as jest.Mock).mock.calls[0][0]).toBe('object');
    });
});
