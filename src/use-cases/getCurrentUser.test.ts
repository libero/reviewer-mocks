import { getCurrentUser } from './getCurrentUser';

describe('getCurrentUser', (): void => {
    it('returns a user', (): void => {
        type User = { id: string; name: string; role: string };
        const user = getCurrentUser()() as User;

        expect(typeof user).toBe('object');
        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.role).toBe('string');
    });
});
