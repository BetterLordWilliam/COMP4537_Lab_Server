import { getDate } from './utils.js';

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

        if (query.get('name')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 200,
                request: req.url,
                date: `Hello ${query.get('name')}, the (server) date today is ${getDate()}.`
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 404,
                request: req.url,
                error: 'name parameter is required'
            }));
        }
    }
}

class Lab3WriteFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/writeFile', 'GET');
    }
}

class Lab3ReadFileEndpoint extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/3/readFile', 'GET');
    }
}

export const API_LIBRARY = new ApiLibrary()
    .addEndpoint(new Lab3GetDateEndpoint())
    .addEndpoint(new Lab3WriteFileEndpoint())
    .addEndpoint(new Lab3ReadFileEndpoint());
