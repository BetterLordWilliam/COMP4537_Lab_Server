import fs from 'fs';

const dataDir   = './data';
const file      = 'file.txt';

const fileInDataDir = (fileName) => {
    return `${dataDir}/${fileName}`;
}


export function readDataFileContents(fileName) {
    return fs.promises.readFile(fileInDataDir(fileName), {
        encoding: 'utf8'
    });
}

export function appendDataFileContents(text) {
    return fs.promises.appendFile(fileInDataDir(file), `\n${text}`, {
        encoding: 'utf8'
    });
}
