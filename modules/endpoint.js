import { getDate } from './utils.js';
import { readDataFileContents, appendDataFileContents } from './services/fileReaderWriter.js';
import ServerStrings from './lang/en/ServerStrings.js';

/**
 * TODO:
 * - apiSuccess helper
 * - apiError helper
 * - apiNotFound helper
 * - apiBadRequest helper
 * - apiTemplatedEndpoint helper (path parameters)
 */

/**
 * API Endpoint library. I don't know if this is a term that is used.
 * a
 */
class ApiLibrary {
    constructor() {
        this.GET = [];
        this.POST = [];
    }

    addEndpoint(endpoint) {
        switch (endpoint.method) {
            case 'GET':
                this.GET.push(endpoint);
                break;
            case 'POST':
                this.POST.push(endpoint);
                break;
        }
        return this;
    }

    addGetEndpoint(endpoint) {
        this.GET.push(endpoint)
        return this;
    }

    addPostEndpoint() {
        this.POST.push(endpoint);
        return this;
    }
}

class ApiEndpoint {
    constructor (endpoint, method) {
        this.endpoint   = endpoint;
        this.method     = method;
        this.regExp     = new RegExp(`${this.endpoint}.*`);
    }

    handle(req, res) {
        throw new Error('Api handler not implemented.');
    }
}

class Lab3GetDateEndpoint extends ApiEndpoint{
    constructor() {
        super('/COMP4537/api/labs/3/getDate', 'GET');
    }

    handle (req, res) {
        let reqTup  = req.url.split('?');
        let query   = new URLSearchParams(reqTup[1]);

        if (!query.get('name')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 400,
                request: req.url,
                error: 'name parameter is required'
            }));

            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end( `<p style="color: blue">${ServerStrings.getDateResponse(query.get('name'), getDate())}</p>`);
    }
}

class Lab3WriteFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/writeFile', 'GET');
    }

    handle (req, res) {
        let reqTup  = req.url.split('?');
        let query   = new URLSearchParams(reqTup[1]);

        if (!query.get('text')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 400,
                request: req.url,
                error: 'text parameter is required'
            }));

            return;
        }

        const promise = appendDataFileContents(query.get('text'));

        promise
            .then(() => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 200,
                    request: req.url,
                    message: 'Text appended to file successfully'
                }));
            })
            .catch((error) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 500,
                    request: req.url,
                    error: `Server failed to process the request`
                }));
            });
    }
}

class Lab3ReadFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/readFile/', 'GET');
    }

    handle (req, res) {

        let fileName = req.url.split('/').at(-1);

        console.log(fileName);

        if (!fileName.endsWith('.txt')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 400,
                request: req.url,
                error: 'Specify the name of a .txt file to read'
            }));

            return;
        }

        const promise = readDataFileContents(fileName);

        promise
            .then((message) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 200,
                    request: req.url,
                    message: message            // message here is the conctents of the file
                }));
            })
            .catch((error) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 500,
                    request: req.url,
                    error: `The server failed to process the request. User says file ${fileName}, but the server could find no such file.`
                }));
            });
    }
}

export const API_LIBRARY = new ApiLibrary()
    .addEndpoint(new Lab3GetDateEndpoint())
    .addEndpoint(new Lab3WriteFileEndpoint())
    .addEndpoint(new Lab3ReadFileEndpoint());
