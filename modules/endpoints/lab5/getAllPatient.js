import ApiEndpoint from '../endpoint.js';

export default class GetAllPatients extends ApiEndpoint {
    constructor () {
        super('/COMP4537/api/labs/5/patients', 'GET')
    }

    handle(req, res) {
        super.handle(req, res);
    }
}
