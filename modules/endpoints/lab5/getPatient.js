import ApiEndpoint from '../endpoint.js';

export default class GetPatients extends ApiEndpoint {
    constructor (databaseService) {
        super('/COMP4537/api/labs/5/patients', 'GET')
        this.databaseService = databaseService;
    }

    handle(req, res) {
        let [ reqUrl, reqQuery ] = req.url.split("?");

        if (reqQuery !== undefined) {
            let searchParams;
            let hasId;
            let id;

            searchParams = new URLSearchParams(reqQuery);
            hasId = searchParams.has('id');

            if (!hasId) {
                return this.writeBadRequest(res, {
                    message: 'if requesting a specific patient, id search parameter cannot be null',
                });
            }

            id = searchParams.get('id');

            return this.databaseService.dbGetPatientById(id)
                .then(dbRes => {
                    this.writeSuccess(res, {
                        message: `database user information for id of ${id}`,
                        data: dbRes
                    });
                })
                .catch(err => {
                    this.writeServerFail(res, {
                        message: 'database query failed.',
                        error: err
                    });
                });

        } else {
            return this.databaseService.dbGetAllPatients()
                .then(dbRes => {
                    this.writeSuccess(res, {
                        message: 'database query success. retrieved all patients',
                        data: dbRes
                    })
                })
                .catch(err => {
                    this.writeServerFail(res, {
                        message: 'database query failed.',
                        error: err
                    })
                });
        }
    }
}
