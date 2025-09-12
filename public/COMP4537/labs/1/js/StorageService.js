import Note from './Note.js'

export default class StorageService {
    /**
     * Determines the largest ID number in local storage and returns one greater.
     * 
     * @returns id Number that is greater than the current largest ID number
     */
    static id () {
        const keys = Object.keys(window.localStorage);

        if (keys.length === 0) {
            return 1;
        }

        const parsedKeys = keys.map(e => parseInt(e) || 0);
        const maxKey = Math.max(...parsedKeys);

        return maxKey + 1;
    }

    /**
     * Returns an array of Note objects representing the data in local storage.
     *  
     * @returns an array of Note objects representing the data in local storage
     */
    static getAllNotes() {
        const notes = Object
            .entries(window.localStorage)
            .map(([key, value]) => new Note(key, value));

        return notes;
    }

    /**
     * Removes a Note object from local storage.
     * 
     * @param {Note} note Object instance which should be removed from local storage
     */
    static removeNote(note) {
        window.localStorage.removeItem(note.id);
    }

    /**
     * Adds a Note object instance to local storage (will also update contents of a note if it already exists).
     * 
     * @param {Note} note Note object instance to add to local storage 
     */
    static addNote(note) {
        window.localStorage.setItem(note.id, note.content);
    }
}
