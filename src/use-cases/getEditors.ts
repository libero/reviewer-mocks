import getMockData from '../getMockData';

export const getEditors = (): ((_, { role }) => {}) => (_, { role }): {} => {
    let editors: object[] = [];
    if (role == 'seniorEditors') {
        editors = getMockData('seniorEditors.json') as Array<object>;
    } else if (role == 'reviewingEditors') {
        editors = getMockData('reviewingEditors.json') as Array<object>;
    }

    return editors;
};
