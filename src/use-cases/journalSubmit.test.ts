import { Request, Response } from 'express';
import { JournalSubmit } from './journalSubmit';
import { ConfigType } from '../config';

describe('submit', () => {
    it('redirects to given url with jwt path', () => {
        const mockRequest: Request = {} as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.redirect = jest.fn();
        const config = ({
            continuum_jwt_secret: 'jwt_secret',
            continuum_return_url: 'http://authurl/authenticate',
        } as unknown) as ConfigType;
        const sign = jest.fn();

        sign.mockImplementation(() => 'signed_jwt_token');

        JournalSubmit(config, sign)(mockRequest, mockResponse);

        expect(sign).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledTimes(1);
        expect(mockResponse.redirect).toHaveBeenCalledWith('http://authurl/authenticate?token=signed_jwt_token');
    });
});
