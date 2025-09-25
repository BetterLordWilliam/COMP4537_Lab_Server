import fs from 'fs';

export function readDataFileContents() {
    if (fs.existsSync('../../data/data.txt')) {
        return fs.readFileAsync('../../data/data.txt', 'utf8')
    }

    return Promise.reject(new Error('File does not exist.'));
}
