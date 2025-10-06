import ApiEndpoint from "../endpoint.js";
import { definitions } from "./definitions.js";

export default class GetDefinition extends ApiEndpoint {
    constructor () {
        super('/COMP4537/api/labs/4/definitions/', 'GET');
    }

    handle (req, res) {
        let word;
        let definition;

        word = req.url.split('/').at(-1);

        try {
            definition = definitions[word];

            if (definition === undefined)
                throw new Error('No definition.');

            console.log(definition);

            return this.writeSuccess(res, {
                request: req.url,
                word: word,
                definition: definition
            });
        } catch (error) {
            return this.writeServerFail(res, {
                request: req.url,
                message: `No definition found for word '${word}'.`
            });
        }
    }
}