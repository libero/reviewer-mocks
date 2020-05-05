import { v4 } from 'uuid';

import { submitSurveyResponse } from './submitSurveryResponse';

describe('submitSurveyResponse', (): void => {
    it('returns survey response', (): void => {
        const submissionId = v4();
        const surveyId = v4();
        const answers = [
            {
                questionId: v4(),
                text: 'text',
                answer: 'answer',
            },
        ];

        const surveyResponse = submitSurveyResponse(null, { submissionId, surveyId, answers });
        expect(surveyResponse.id).toBeDefined();
        expect(surveyResponse.submissionId).toEqual(submissionId);
        expect(surveyResponse.surveyId).toEqual(surveyId);
        expect(surveyResponse.questions.length).toEqual(1);
        expect(surveyResponse.answers.length).toEqual(1);
    });
});
