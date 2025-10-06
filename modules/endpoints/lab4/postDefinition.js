import ApiEndpoint from "../endpoint.js";
import { definitions } from "./definitions.js";

export default class PostDefinition extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/4/definitions', 'POST');
        this.reqCount = 0;
    }

    handle(req, res) {
        let body;
        let parsedBody;
        let word;

        body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            try {
                // ensures that all the raw binary data is joined together correctly
                parsedBody = JSON.parse(Buffer.concat(body).toString());

                console.log(parsedBody);

                if (parsedBody.word === undefined || parsedBody.definition === undefined) {
                    return this.writeBadRequest(res, {
                        request: req.url,
                        error: `body parameter(s) 'word' and 'definition' are required.`
                    });
                }

                if (definitions[parsedBody.word] !== undefined) {
                    return this.writeBadRequest(res, {
                        request: req.url,
                        word: parsedBody.word,
                        error: `Warning, there is already a definition for word '${parsedBody.word}'.`
                    })
                }
                
                definitions[parsedBody.word] = parsedBody.definition;

                return this.writeSuccess(res, {
                    request: req.url,
                    numberOfRequests: ++this.reqCount,
                    numberOfEntries: Object.entries(definitions).length,
                    message: `Word '${parsedBody.word}' now has definition '${parsedBody.definition}'`
                });
                 
            } catch (error) {
                this.writeServerFail(res, {
                    request: req.url,
                    error: error
                });
            }
        });
    }
}