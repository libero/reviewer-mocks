import getMockData from '../getMockData';

export const getCurrentUser = () => (): object => {
    return getMockData('currentUser.json');
};
