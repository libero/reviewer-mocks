import { getCurrentUser, getSubFromAuthorizationHeader } from './getCurrentUser';

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
});
