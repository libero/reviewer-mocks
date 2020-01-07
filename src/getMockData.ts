import { readFileSync } from 'fs';

const mockDataDirectoryPath = process.env.DATA_DIRECTORY_PATH ? process.env.DATA_DIRECTORY_PATH : '/app/mock-data/';

export default function(mockDataFileName): object {
    return JSON.parse(readFileSync(`${mockDataDirectoryPath}${mockDataFileName}`, 'utf8'));
}
