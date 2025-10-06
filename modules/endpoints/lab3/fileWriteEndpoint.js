import ApiEndpoint from '../endpoint.js';
import { readDataFileContents, appendDataFileContents } from '../../services/fileReaderWriter.js';

export default class Lab3WriteFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/writeFile', 'GET');
    }

    handle (req, res) {
        let reqTup  = req.url.split('?');
        let query   = new URLSearchParams(reqTup[1]);

        if (!query.get('text')) {
            return this.writeBadRequest(res, {
                request: req.url,
                error: 'text parameter is required.'
            });
        }

        appendDataFileContents(query.get('text'))
            .then(() => {
                return this.writeSuccess(res, {
                    request: req.url,
                    message: 'Text appended to file successfully'
                });
            })
            .catch((error) => {
                return this.writeServerFail(res, {
                    request: req.url,
                    message: 'Server failed to process the request'
                });
            });
    }
}
