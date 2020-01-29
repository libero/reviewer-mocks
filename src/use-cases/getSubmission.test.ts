import { getSubmission } from './getSubmission';

describe('getSubmission', (): void => {
    it('returns the submission with correct id', (): void => {
        const submissions = [{ id: 'A' }, { id: 'B' }];
        expect(getSubmission(submissions)('A')).toStrictEqual({ id: 'A' });
        expect(getSubmission(submissions)('B')).toStrictEqual({ id: 'B' });
    });
    it('throws error if no submission is found', (): void => {
        expect((): void => {
            getSubmission([])('A');
        }).toThrow('could not find submission with id: A');
    });
});
