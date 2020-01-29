import { deleteSubmission } from './deleteSubmission';

describe('deleteSubmission', (): void => {
    it('removes the submission with a given id', (): void => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        expect(submissions).toHaveLength(2);
        deleteSubmission(submissions)('A');
        expect(submissions).toHaveLength(1);
        expect(submissions[0]).toStrictEqual({ id: 'B' });
    });
    it('returns true when it has deleted a submission', (): void => {
        const submissions = [{ id: 'A' }];
        expect(deleteSubmission(submissions)('A')).toBe(true);
    });
    it('returns false when it cant find submission to delete', (): void => {
        const submissions = [{ id: 'A' }];
        expect(deleteSubmission(submissions)('C')).toBe(false);
    });
});
