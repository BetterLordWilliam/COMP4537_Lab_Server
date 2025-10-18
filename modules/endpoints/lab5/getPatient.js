import ApiEndpoint from '../endpoint.js';

export default class GetPatients extends ApiEndpoint {
    constructor (databaseService) {
        super('/COMP4537/api/labs/5/patients', 'GET')
        this.databaseService = databaseService;
    }

    tryGetPatient(req, res, id) {
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
    }

    tryRunSQL(req, res, query) {
        try {
            return this.databaseService.dbExecuteQuery(query)
                .then(dbRes => {
                    this.writeSuccess(res, {
                        message: 'Database query executed successfully.',
                        data: dbRes
                    });
                })
                .catch(dbErr => {
                    this.writeServerFail(res, {
                        message: 'Database query failed.',
                        error: dbErr
                    });
                });

        } catch (err) {
            return this.writeBadRequest(res, {
                message: 'You really thought?',
                error: err
            })
        }
    }

    handle(req, res) {
        let [ reqUrl, reqQuery ] = req.url.split("?");
        let searchParams;
        let hasQuery;
        let hasId;
        let id;
        let query;

        if (reqQuery !== undefined) {

            searchParams = new URLSearchParams(reqQuery);
            hasId = searchParams.has('id');
            hasQuery = searchParams.has('q');

            if (hasQuery) {
                query = searchParams.get('q');
                return this.tryRunSQL(req, res, query);
            } else if (hasId) {
                id = searchParams.get('id');
                return this.tryGetPatient(req, res, id);
            } else {
                return this.writeBadRequest(res, {
                    message: 'You need to provide \'id\' parameter to get a patient'
                });
            }

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
