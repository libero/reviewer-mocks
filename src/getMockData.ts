import { readFileSync } from 'fs';
import config from './config';

export default function(mockDataFileName): object {
    let fetchedData;
    try {
        fetchedData = readFileSync(`${config.mockDataDirectoryPath}${mockDataFileName}`, 'utf8');
    } catch (_) {
        console.warn(
            `Failed to fetch mocked data from ${config.mockDataDirectoryPath}${mockDataFileName} falling back to default mock data`,
        );
        fetchedData = readFileSync(`${config.defaultMockDataDirectoryPath}${mockDataFileName}`, 'utf8');
    }

    return JSON.parse(fetchedData);
}
