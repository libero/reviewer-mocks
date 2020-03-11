import { v4 } from 'uuid';
import { saveAuthorPage } from './saveAuthorPage';

describe('saveAuthorPage', (): void => {
    it('save details returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                author: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    institution: '',
                },
            },
        ];

        const input = {
            firstName: 'Bob',
            lastName: 'Windsor',
            email: 'bob@nowhere.com',
            institution: 'eLife',
        };

        const badRequest = (): object => saveAuthorPage(submissions)(null, { id: submissionId, details: input });
        expect(badRequest).toThrow();
    });

    it('save author details of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                author: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    institution: '',
                },
            },
        ];

        const input = {
            firstName: 'Bob',
            lastName: 'Windsor',
            email: 'bob@nowhere.com',
            institution: 'eLife',
        };

        saveAuthorPage(submissions)(null, { id: submissionId, details: input });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].author.firstName).toBe('Bob');
        expect(submissions[0].author.lastName).toBe('Windsor');
        expect(submissions[0].author.email).toBe('bob@nowhere.com');
        expect(submissions[0].author.institution).toBe('eLife');
    });
});
