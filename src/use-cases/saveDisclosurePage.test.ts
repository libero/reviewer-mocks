import { v4 } from 'uuid';
import { saveDisclosurePage } from './saveDisclosurePage';

describe('saveDisclosurePage', (): void => {
    it('save details returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                disclosure: {
                    submitterSignature: '',
                    disclosureConsent: false,
                },
            },
        ];

        const input = {
            submitterSignature: 'mickey mouse',
            disclosureConsent: true,
        };

        const badRequest = (): object => saveDisclosurePage(submissions)(null, { id: submissionId, details: input });
        expect(badRequest).toThrow();
    });

    it('save disclosure page of a submission', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                disclosure: {
                    submitterSignature: '',
                    disclosureConsent: false,
                },
            },
        ];

        const input = {
            submitterSignature: 'mickey mouse',
            disclosureConsent: true,
        };

        saveDisclosurePage(submissions)(null, { id: submissionId, details: input });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].disclosure.submitterSignature).toBe('mickey mouse');
        expect(submissions[0].disclosure.disclosureConsent).toBe(true);
    });
});
