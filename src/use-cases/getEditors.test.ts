import { getEditors } from './getEditors';

describe('get editors', (): void => {
    it('returns a list of senior editors', (): void => {
        const editors = getEditors()({}, { role: 'seniorEditor' });

        expect(editors).toHaveLength(3);
        expect(editors[0]).toHaveProperty('id');
        expect(editors[0].id).toBe('0aa30b85');

        expect(editors[0]).toHaveProperty('name');
        expect(editors[0].name).toBe('Reviewer1');

        expect(editors[0]).toHaveProperty('aff');
        expect(editors[0].aff).toBe('Rev1 Uni');

        expect(editors[0]).toHaveProperty('focuses');
        expect(editors[0].focuses).toHaveLength(2);

        expect(editors[0]).toHaveProperty('expertises');
        expect(editors[0].expertises).toHaveLength(2);
    });
    it('returns a list of reviewing editors', (): void => {
        const editors = getEditors()({}, { role: 'reviewingEditor' });

        expect(editors).toHaveLength(3);
        expect(editors[1]).toHaveProperty('id');
        expect(editors[1].id).toBe('007');

        expect(editors[1]).toHaveProperty('name');
        expect(editors[1].name).toBe('James Bond');

        expect(editors[1]).toHaveProperty('aff');
        expect(editors[1].aff).toBe('MI6');

        expect(editors[1]).toHaveProperty('focuses');
        expect(editors[1].focuses).toHaveLength(2);

        expect(editors[1]).toHaveProperty('expertises');
        expect(editors[1].expertises).toHaveLength(2);
    });
});
