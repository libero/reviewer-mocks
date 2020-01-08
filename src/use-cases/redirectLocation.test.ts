import { Request, Response } from 'express';
import { RedirectLocation } from './redirectLocation';

describe('redirectLocation', (): void => {
    it('returns confirmation of reaching location', (): void => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.send = jest.fn();
        mockResponse.status = jest.fn(() => mockResponse);

        RedirectLocation()(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toBeCalledWith(200);
        // Warning: this value is probably being asserted on by other services integration tests
        expect(mockResponse.send).toBeCalledWith('Redirect reached successfully');
    });
});
