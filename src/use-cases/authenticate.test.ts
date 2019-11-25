import { Request, Response } from 'express';
import { Authenticate } from './authenticate';

describe('authenticate', () => {
    it('tests', () => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.redirect = jest.fn();
        const config = {
            continuumAuthJwtSecret: 'jwt_secret',
            continuumAuthRedirectUrl: 'http://client/',
        };
        const sign = jest.fn();

        sign.mockImplementation(() => 'signed_jwt_token');

        Authenticate(config, sign)(mockRequest, mockResponse);

        expect(sign).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledWith('http://client/#signed_jwt_token');
    });
});
