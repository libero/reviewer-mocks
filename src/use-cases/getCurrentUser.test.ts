import { Request, Response } from 'express';
import { getCurrentUser } from './getCurrentUser';

describe('getCurrentUser', (): void => {
    it('returns a user', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        getCurrentUser()(mockRequest, mockResponse);

        const user = (mockResponse.json as jest.Mock).mock.calls[0][0];
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(typeof user).toBe('object');
        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.role).toBe('string');
    });
});
