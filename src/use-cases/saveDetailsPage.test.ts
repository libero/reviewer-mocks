import { v4 } from 'uuid';
import { saveDetailsPage } from './saveDetailsPage';

describe('saveDetailsPage', (): void => {
    it('save details returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                lastStepVisited: 'files',
                manuscriptDetails: {
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

    it('save manuscript details of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                lastStepVisited: 'files',
                manuscriptDetails: {
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
        expect(submissions[0].manuscriptDetails.title).toBe('test');
        expect(submissions[0].manuscriptDetails.subjects).toHaveLength(1);
        expect(submissions[0].manuscriptDetails.subjects[0]).toBe('Cancer Biology');
        expect(submissions[0].manuscriptDetails.previouslyDiscussed).toBe('no');
        expect(submissions[0].manuscriptDetails.previouslySubmitted).toHaveLength(1);
        expect(submissions[0].manuscriptDetails.previouslySubmitted[0]).toBe('not-sure');
        expect(submissions[0].manuscriptDetails.cosubmisssion).toHaveLength(1);
        expect(submissions[0].manuscriptDetails.cosubmisssion[0]).toBe('certainly');
    });
});
