import { Request, Response } from 'express';
import { JournalSubmit } from './journalSubmit';

describe('submit', () => {
    it('redirects to given url with jwt path', () => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.redirect = jest.fn();
        const config = {
            continuumLoginJwtSecret: 'jwt_secret',
            continuumLoginRedirectUrl: 'http://authurl/authenticate',
        };
        const sign = jest.fn();

        sign.mockImplementation(() => 'signed_jwt_token');

        JournalSubmit(config, sign)(mockRequest, mockResponse);

        expect(sign).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledWith('http://authurl/authenticate#signed_jwt_token');
    });
});
