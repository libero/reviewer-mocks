import { getCurrentUser, getSubFromAuthorizationHeader, userApiGetEditors } from './userApi';
import { Request, Response } from 'express';

describe('getCurrentUser', (): void => {
    it('returns a user', (): void => {
        type User = { id: string; name: string; role: string };
        const user = getCurrentUser() as User;

        expect(typeof user).toBe('object');
        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.role).toBe('string');
    });
    it('it should return sub from valid header', (): void => {
        const header =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMGU2NGE4Ni0yZmViLTQzNWQtYTQwZi0wMWY5MjAzMzRiYzQiLCJpYXQiOjE1ODM4Mzg5MTF9.wD0oDVUYzU65mnELonbR1q_bTBMYdwtksYH3Tbp4dJ0';
        const expectedSub = 'c0e64a86-2feb-435d-a40f-01f920334bc4';
        const sub = getSubFromAuthorizationHeader(header);
        expect(sub).toBe(expectedSub);
    });
    it('returns a list of senior editors', (): void => {
        const mockRequest: Request = { query: { role: 'seniorEditors' } } as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        userApiGetEditors()(mockRequest, mockResponse);
        const editors = (mockResponse.json as jest.Mock).mock.calls[0][0];

        expect(editors).toHaveLength(3);
        expect(editors[0]).toHaveProperty('id');
        expect(editors[0].id).toBe('0aa30b85');

        expect(editors[0]).toHaveProperty('name');
        expect(editors[0].name).toBe('Reviewer1');

        expect(editors[0]).toHaveProperty('aff');
        expect(editors[0].aff).toBe('Rev1 Uni');

        expect(editors[0]).toHaveProperty('focuses');
        expect(editors[0].focuses).toHaveLength(2);

        expect(editors[0]).toHaveProperty('expertises');
        expect(editors[0].expertises).toHaveLength(2);
    });
    it('returns a list of reviewing editors', (): void => {
        const mockRequest: Request = { query: { role: 'reviewingEditors' } } as Request;
        const mockResponse: Response = {} as Response;
        mockResponse.json = jest.fn();

        userApiGetEditors()(mockRequest, mockResponse);
        const editors = (mockResponse.json as jest.Mock).mock.calls[0][0];

        expect(editors).toHaveLength(3);
        expect(editors[1]).toHaveProperty('id');
        expect(editors[1].id).toBe('007');

        expect(editors[1]).toHaveProperty('name');
        expect(editors[1].name).toBe('James Bond');

        expect(editors[1]).toHaveProperty('aff');
        expect(editors[1].aff).toBe('MI6');

        expect(editors[1]).toHaveProperty('focuses');
        expect(editors[1].focuses).toHaveLength(2);

        expect(editors[1]).toHaveProperty('expertises');
        expect(editors[1].expertises).toHaveLength(2);
    });
});
