import ApiEndpoint from '../endpoint.js';
import { readDataFileContents, appendDataFileContents } from '../../services/fileReaderWriter.js';

export default class Lab3ReadFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/readFile/', 'GET');
    }

    handle (req, res) {
        let fileName = req.url.split('/').at(-1);

        if (!fileName.endsWith('.txt')) {
            return this.writeBadRequest(res, {
                request: req.url,
                error: 'Specify the name of a .txt file to read'
            });
        }

        readDataFileContents(fileName)
            .then((message) => {
                return this.writeSuccess(res, {
                    request: req.url,
                    message: message
                });
            })
            .catch((error) => {
                return this.writeServerFail(res, {
                    request: req.url,
                    error: `The server failed to process the request. User says file ${fileName}, but the server could find no such file.`
                });
            });
    }
}
