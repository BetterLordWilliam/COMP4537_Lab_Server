import ApiEndpoint from '../endpoint.js';

export default class UnsafePostPatient extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/5/patients', 'POST');
    }

    handle(req, res) {
        console.log('');
    }
}