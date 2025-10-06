import ApiEndpoint from '../endpoint.js';
import ServerStrings from '../../lang/en/ServerStrings.js';

export default class Lab3GetDateEndpoint extends ApiEndpoint {
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
        
        // Special case, return HTML
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end( `<p style="color: blue">${ServerStrings.getDateResponse(query.get('name'), new Date())}</p>`);
    }
}
