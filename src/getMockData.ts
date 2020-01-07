import { readFileSync } from 'fs';

const defaultMockDataDirectoryPath = '/app/mock-data/';
const mockDataDirectoryPath = process.env.DATA_DIRECTORY_PATH
    ? process.env.DATA_DIRECTORY_PATH
    : defaultMockDataDirectoryPath;

export default function(mockDataFileName): object {
    let fetchedData;
    try {
        fetchedData = readFileSync(`${mockDataDirectoryPath}${mockDataFileName}`, 'utf8');
    } catch (_) {
        console.warn(
            `Failed to fetch mocked data from ${mockDataDirectoryPath}${mockDataFileName} falling back to default mock data`,
        );
        fetchedData = readFileSync(`${defaultMockDataDirectoryPath}${mockDataFileName}`, 'utf8');
    }

    return JSON.parse(fetchedData);
}
