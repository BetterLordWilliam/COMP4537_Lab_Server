import ApiEndpoint from '../endpoint.js';

export default class PostPatient extends ApiEndpoint {
    constructor(databaseService) {
        super('/COMP4537/api/labs/5/patients', 'POST')
        this.databaseService = databaseService;
    }

    tryAddPatient(req, res, body) {
        let parsedBody;
        let name;
        let dateOfBirth;

        parsedBody = JSON.parse(Buffer.concat(body).toString());
        name = parsedBody.name;
        dateOfBirth = parsedBody.name;

        console.log(parsedBody);

        if (name === undefined) {
            return this.writeBadRequest(res, {
                message: 'Body parameter \'name\' is required.'
            });
        }

        if (dateOfBirth === undefined) {
            return this.writeBadRequest(res, {
                message: 'Body parameter \'dateOfBirth\' is required.'
            });
        }

        return this.databaseService.dbInsertNewPatient(
            null,
            parsedBody.name,
            parsedBody.dateOfBirth
        )
            .then(dbRes => {
                this.writeSuccess(res, {
                    message: `new patient with name \'${parsedBody.name}\' and dob \'${parsedBody.dateOfBirth}\' added to db.`,
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

    tryRunSQLQuery(req, res, body) {
        let bodyString;
        bodyString = body.toString().toLowerCase();

        // Ultra consertative SQL, deny anything that is HERESY
        // 1. Mutliple SQL statements, if the query contains ';', DENIED
        // 2. Contains ALTER, DROP, DELETE, USE, DENIED
        // 3. The service account will actually prevent these from being run, but DENY anyways
        if (bodyString.includes(';')) {
            return this.writeBadRequest(res, {
                message: 'Thou shalt NOT try and run multiple queries against my database.',
                badQuery: bodyString
            });
        }
        if (bodyString.includes('drop') || bodyString.includes('delete')) {
            return this.writeBadRequest(res, {
                message: 'Thou shalt NOT try and drop or delete anything, not that you could if you even wanted to.',
                badQuery: bodyString
            });
        }

        // Execute the query (this is HERESY, please forgive me I am being forced to do this)
        return this.databaseService.dbExecuteQuery(body.toString())
            .then(dbRes => {
                this.writeSuccess(res, {
                    message: 'Database query executed successfully.',
                    data: dbRes
                });
            })
            .catch(err => {
                this.writeServerFail(res, {
                    message: 'Database query could not be executed.',
                    error: err
                });
            });
    }

    handle(req, res) {
        let body;
        body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            // console.log(req.headers['content-type']);
            // console.log(req.headers);

            if (req.headers['content-type'] === 'text/plain') {
                return this.tryRunSQLQuery(req, res, body);
            } else if (req.headers['content-type'] !== 'application/json') {
                return this.writeBadRequest(res, {
                    message: '\'Content-Type\' header should be \'application/json\''
                });
            }
            
            return this.tryAddPatient(req, res, body);
        });
    }
}
