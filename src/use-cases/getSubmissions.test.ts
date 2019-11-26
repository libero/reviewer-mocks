import { getSubmissions } from './getSubmissions';

describe('getSubmissions', (): void => {
    it('returns empty submissions', () => {
        const submissions = getSubmissions([])();
        expect(submissions).toEqual([]);
    });
    it('returns list of submissions', () => {
        const submissions = getSubmissions([{ id: '1' }])();
        expect(submissions).toEqual([{ id: '1' }]);
    });
});
