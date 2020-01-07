import getMockData from '../getMockData';

export const getCurrentProfile = () => (): object => {
    return getMockData('currentUser.json');
};
