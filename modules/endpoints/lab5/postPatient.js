import ApiEndpoint from '../endpoint.js';

export default class PostPatient extends ApiEndpoint {
    constructor(databaseService) {
        super('/COMP4537/api/labs/5/patients', 'POST')
        this.databaseService = databaseService;
    }

    handle(req, res) {
        let body;
        let parsedBody;
        let name;
        let dateOfBirth;

        body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
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
        });
    }
}
