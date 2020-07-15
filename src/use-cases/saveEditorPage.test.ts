import { v4 } from 'uuid';
import { saveEditorPage } from './saveEditorPage';

describe('saveEditorPage', (): void => {
    it('save returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                lastStepVisited: 'details',
                editorDetails: {
                    suggestedSeniorEditors: [],
                    opposedSeniorEditors: [],
                    opposedSeniorEditorsReason: '',
                    suggestedReviewingEditors: [],
                    opposedReviewingEditors: [],
                    opposedReviewingEditorsReason: '',
                    suggestedReviewers: [],
                    opposedReviewers: [],
                    opposedReviewersReason: '',
                },
            },
        ];

        const input = {
            suggestedSeniorEditors: ['123'],
            opposedSeniorEditors: ['456'],
            opposedSeniorEditorsReason: 'no reason',
            suggestedReviewingEditors: ['789'],
            opposedReviewingEditors: ['1011'],
            opposedReviewingEditorsReason: 'maybe a reason',
            suggestedReviewers: [{ name: 'name1', email: 'email1@elifesciences.org' }],
            opposedReviewers: [{ name: 'name2', email: 'email2@elifesciences.org' }],
            opposedReviewersReason: 'probably a reason',
        };

        const badRequest = (): object => saveEditorPage(submissions)(null, { id: submissionId, details: input });
        expect(badRequest).toThrow();
    });

    it('save editor details of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                lastStepVisited: 'details',
                editorDetails: {
                    suggestedSeniorEditors: [],
                    opposedSeniorEditors: [],
                    opposedSeniorEditorsReason: '',
                    suggestedReviewingEditors: [],
                    opposedReviewingEditors: [],
                    opposedReviewingEditorsReason: '',
                    suggestedReviewers: [],
                    opposedReviewers: [],
                    opposedReviewersReason: '',
                },
            },
        ];

        const input = {
            suggestedSeniorEditors: ['123'],
            opposedSeniorEditors: ['456'],
            opposedSeniorEditorsReason: 'no reason',
            suggestedReviewingEditors: ['789'],
            opposedReviewingEditors: ['1011'],
            opposedReviewingEditorsReason: 'maybe a reason',
            suggestedReviewers: [{ name: 'name1', email: 'email1@elifesciences.org' }],
            opposedReviewers: [{ name: 'name2', email: 'email2@elifesciences.org' }],
            opposedReviewersReason: 'probably a reason',
        };

        saveEditorPage(submissions)(null, { id: submissionId, details: input });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].editorDetails).toEqual(input);
        expect(submissions[0].lastStepVisited).toBe(`/submit/${submissionId}/editors`);
    });
});
