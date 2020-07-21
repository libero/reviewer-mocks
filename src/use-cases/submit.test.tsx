import { v4 } from 'uuid';
import { submit } from './submit';

describe('Submit', (): void => {
    it('returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                status: 'CONTINUE_SUBMISSION'
            },
        ];

        const badRequest = (): object => submit(submissions)(null, { id: submissionId, });
        expect(badRequest).toThrow();
    });

    it('submits a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                status: 'CONTINUE_SUBMISSION'
            },
        ];

        submit(submissions)(null, { id: submissionId });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].status).toBe('SUBMITTED');
    });
});
