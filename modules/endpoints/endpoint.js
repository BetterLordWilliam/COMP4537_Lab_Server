export default class ApiEndpoint {
    constructor (endpoint, method) {
        this.endpoint   = endpoint;
        this.method     = method;
        this.regExp     = new RegExp(`${this.endpoint}.*`);
    }

    handle(req, res) {
        throw new Error('Api handler not implemented.');
    }

    writeSuccess(res, data) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data));
    }

    writeServerFail(res, data) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    writeBadRequest(res, data) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
}
