import ApiEndpoint from "../endpoint.js";
import { definitions } from "./definitions.js";

export default class GetDefinition extends ApiEndpoint {
    constructor () {
        super('/COMP4537/api/labs/4/definitions', 'GET');
    }

    handle (req, res) {
        let reqTuple;
        let urlQueryString;
        let definition;
        let hasWord;
        let word;

        try {
            reqTuple        = req.url.split('?');
            urlQueryString  = new URLSearchParams(reqTuple[1]);
            hasWord         = urlQueryString.has('word');
            
            // User did not send a URL search parameter word
            if (!hasWord) {
                return this.writeBadRequest(res, {
                    request: req.url,
                    message: `URL search parameter 'word' required.`
                });
            }
            
            word        = urlQueryString.get('word');
            definition  = definitions[word];

            // There is no definition for the word the user requested
            if (definition === undefined) {
                return this.writeBadRequest(res, {
                    request: req.url,
                    message: `No definition found for word '${word}'.`
                });
            }

            return this.writeSuccess(res, {
                request: req.url,
                word: word,
                definition: definition,
                message: 'Successfully found word definition.'
            });

        } catch (error) {
            return this.writeServerFail(res, {
                request: req.url,
                error: error,
                message: 'The server failed to process the request.'
            });
        }
    }
}