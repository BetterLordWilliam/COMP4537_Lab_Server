import ApiEndpoint from '../endpoint.js';

export default class GetAllPatients extends ApiEndpoint {
    constructor (databaseService) {
        super('/COMP4537/api/labs/5/patients', 'GET')
        this.databaseService = databaseService;
    }

    handle(req, res) {
        super.handle(req, res);
    }
}
