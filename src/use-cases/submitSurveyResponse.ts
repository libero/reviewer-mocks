import { v4 } from 'uuid';
import { logger } from '../logger';

import { SurveyResponse, SurveyAnswer } from './types';

export const submitSurveyResponse = (
    _,
    args: { surveyId: string; submissionId: string; answers: SurveyAnswer[] },
): SurveyResponse => {
    const id = v4();
    const { surveyId, submissionId, answers } = args;
    logger.info(`submitSurveyResponse(${surveyId}, ${submissionId}, ${JSON.stringify(answers)})`);
    const surveyResponse = new SurveyResponse(id, surveyId, submissionId);

    answers.forEach(({ questionId, text, answer }: SurveyAnswer) => {
        surveyResponse.answerQuestion(questionId, text, answer);
    });

    return surveyResponse;
};
