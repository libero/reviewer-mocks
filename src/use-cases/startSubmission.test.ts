import { startSubmission } from './startSubmission';

describe('startSubmisison', (): void => {
    it('creates a new submission', (): void => {
        const submissions = [];
        startSubmission(submissions)('articleInput');
        expect(submissions).toHaveLength(1);
    });
});
