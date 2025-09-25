import fs from 'fs';

export function readDataFileContents() {
    return fs.promises.readFile('../../data/file.txt', {
        encoding: 'utf8'
    });
}

export function appendDataFileContents(text) {
    return fs.promises.appendFile('../../data/file.txt', `\n${text}`, {
        encoding: 'utf8'
    });
}
