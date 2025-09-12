export default class Note {

    /**
     * Initializes a Note object.
     * 
     * @param {String} content text of the note
     */
    constructor(content) {
        this.content = content;
    }

    /**
     * Convert JSON serialized version of the class into instance.
     * 
     * @param {JSON} json JSON object to turn into class instance
     * @returns Instance of the Note class
     */
    static fromJSON(json) {
        return new Note(
            json.content
        );
    }
}
