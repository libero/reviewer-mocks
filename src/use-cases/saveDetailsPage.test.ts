import { v4 } from 'uuid';
import { saveDetailsPage } from './saveDetailsPage';

describe('saveDetailsPage', (): void => {
    it('save details returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                details: {
                    title: '',
                    subjects: [],
                    previouslyDiscussed: '',
                    previouslySubmitted: [],
                    cosubmisssion: [],
                },
            },
        ];

        const input = {
            title: 'test',
            subjects: ['Cancer Biology'],
            previouslyDiscussed: '',
            previouslySubmitted: [],
            cosubmisssion: [],
        };

        const badRequest = (): object => saveDetailsPage(submissions)(null, { id: submissionId, details: input });
        expect(badRequest).toThrow();
    });

    it('save author details of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                details: {
                    title: '',
                    subjects: [],
                    previouslyDiscussed: '',
                    previouslySubmitted: [],
                    cosubmisssion: [],
                },
            },
        ];

        const input = {
            title: 'test',
            subjects: ['Cancer Biology'],
            previouslyDiscussed: 'no',
            previouslySubmitted: ['not-sure'],
            cosubmisssion: ['certainly'],
        };

        saveDetailsPage(submissions)(null, { id: submissionId, details: input });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].details.title).toBe('test');
        expect(submissions[0].details.subjects).toHaveLength(1);
        expect(submissions[0].details.subjects[0]).toBe('Cancer Biology');
        expect(submissions[0].details.previouslyDiscussed).toBe('no');
        expect(submissions[0].details.previouslySubmitted).toHaveLength(1);
        expect(submissions[0].details.previouslySubmitted[0]).toBe('not-sure');
        expect(submissions[0].details.cosubmisssion).toHaveLength(1);
        expect(submissions[0].details.cosubmisssion[0]).toBe('certainly');
    });
});
