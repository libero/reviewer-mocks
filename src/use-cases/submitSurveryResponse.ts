import { v4 } from 'uuid';

import { SurveyResponse, SurveyAnswer } from './types';

export const submitSurveyRespnse = (
    _,
    args: { surveyId: string; submissionId: string; answers: SurveyAnswer[] },
): {} => {
    const id = v4();
    const { surveyId, submissionId, answers } = args;
    const surveyResponse = new SurveyResponse(id, surveyId, submissionId);

    answers.forEach(({ questionId, text, answer }: SurveyAnswer) => {
        surveyResponse.answerQuestion(questionId, text, answer);
    });

    return surveyResponse;
};
