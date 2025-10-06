import { request } from "express";
import ApiEndpoint from "../endpoint.js";
import { requestCount, definitions } from "./definitions.js";

export default class PostDefinition extends ApiEndpoint {
    constructor() {
        super('/COMP4537/api/labs/4/definitions', 'POST');
        this.reqCount = 0;
    }

    handle(req, res) {
        let body;
        let parsedBody;

        body = [];

        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            try {
                requestCount.count += 1;

                // ensures that all the raw binary data is joined together correctly
                parsedBody = JSON.parse(Buffer.concat(body).toString());

                console.log(parsedBody);

                // Invalid request, requestor did not give a word or a definition (very bad)
                if (parsedBody.word === undefined || parsedBody.definition === undefined) {
                    return this.writeBadRequest(res, {
                        request: req.url,
                        numberOfRequests: requestCount.count,
                        error: `body parameter(s) 'word' and 'definition' are required.`
                    });
                }
                
                // Invalid request, the word already has a definition
                if (definitions[parsedBody.word] !== undefined) {
                    return this.writeBadRequest(res, {
                        request: req.url,
                        word: parsedBody.word,
                        numberOfRequests: requestCount.count,
                        message: `Warning, there is already a definition for word '${parsedBody.word}'.`
                    });
                }

                definitions[parsedBody.word] = parsedBody.definition;

                return this.writeSuccess(res, {
                    request: req.url,
                    numberOfRequests: requestCount.count,
                    numberOfEntries: Object.entries(definitions).length,
                    message: `Word '${parsedBody.word}' now has definition '${parsedBody.definition}'`
                });
                 
            } catch (error) {
                this.writeServerFail(res, {
                    request: req.url,
                    error: error,
                    numberOfRequests: requestCount.count,
                    message: 'Server failed to process the request.'
                });
            }
        });
    }
}