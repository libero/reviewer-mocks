import { v4 } from 'uuid';
import { saveArticleType } from './saveArticleType';

describe('saveArticleType', (): void => {
    it('save article type returns error if id not found', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: v4(),
                lastStepVisited: 'author',
                articleType: '',
            },
        ];

        const badRequest = (): object =>
            saveArticleType(submissions)(null, { id: submissionId, articleType: 'Research Article' });
        expect(badRequest).toThrow();
    });

    it('save article type', (): void => {
        const submissionId = v4();
        const submissions = [
            {
                id: submissionId,
                lastStepVisited: 'author',
                articleType: '',
            },
        ];

        saveArticleType(submissions)(null, { id: submissionId, articleType: 'Research Article' });
        expect(submissions).toHaveLength(1);
        expect(submissions[0].articleType).toBe('Research Article');
    });
});
