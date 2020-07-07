import { Request, Response } from 'express';
import { ConfigType } from '../config';
import { Authenticate } from './authenticate';

describe('authenticate', () => {
    it('redirects to given url with jwt', () => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.redirect = jest.fn();
        const config = ({
            authentication_jwt_secret: 'jwt_secret',
            login_return_url: 'http://client',
        } as unknown) as ConfigType;
        const sign = jest.fn();

        sign.mockImplementation(() => 'signed_jwt_token');

        Authenticate(config, sign)(mockRequest, mockResponse);

        expect(sign).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledWith('http://client?token=signed_jwt_token');
    });
});
