import { deleteSubmission } from './deleteSubmission';

describe('deleteSubmission', (): void => {
    it('removes the submission with a given id', (): void => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        expect(submissions).toHaveLength(2);
        deleteSubmission(submissions)(null, { id: 'A' });
        expect(submissions).toHaveLength(1);
        expect(submissions[0]).toStrictEqual({ id: 'B' });
    });
    it('returns id when it has deleted a submission', (): void => {
        const submissions = [{ id: 'A' }];
        expect(deleteSubmission(submissions)(null, { id: 'A' })).toBe('A');
    });
    it('returns undefined when it cant find submission to delete', (): void => {
        const submissions = [{ id: 'A' }];
        expect(() => deleteSubmission(submissions)(null, { id: 'C' })).toThrow("can't find submission: C");
    });
});
