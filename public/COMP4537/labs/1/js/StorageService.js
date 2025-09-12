import Note from './Note.js'

export default class StorageService {

    static UPDATED = 'updated';
    static NOTES = 'notes';

    /**
     * Returns an array of Note objects representing the data in local storage.
     *  
     * @returns an array of Note objects representing the data in local storage
     */
    static getAllNotes() {
        const notes = JSON.parse(window.localStorage.getItem(StorageService.NOTES)) || [];
        const deserialized = notes.map(noteJSON => Note.fromJSON(noteJSON));

        return deserialized;
    }

    /**
     * Removes a Note object from local storage.
     * 
     * @param {Note} note Object instance which should be removed from local storage
     */
    static removeNote(note) {
        const notes = this.getAllNotes();
        const removeIdx = notes.findIndex(obj => obj.content === note.content);

        if (removeIdx !== -1) {
            notes.splice(removeIdx, 1);
        }

        window.localStorage.setItem(StorageService.NOTES, JSON.stringify(notes));
        window.localStorage.setItem(StorageService.UPDATED, new Date().toLocaleString());
    }

    /**
     * Adds a Note object instance to local storage (will also update contents of a note if it already exists).
     * 
     * @param {Note} note Note object instance to add to local storage 
     */
    static addNote(note) {
        const notes = this.getAllNotes();
        const noteIdx = notes.findIndex(obj => obj.id === note.id);

        if (noteIdx !== -1) {
            notes[noteIdx] = note;
        } else {
            notes.push(note);
        }

        window.localStorage.setItem(StorageService.NOTES, JSON.stringify(notes));
        window.localStorage.setItem(StorageService.UPDATED, new Date().toLocaleString());
    }

    /**
     * Returns string of when local storage was last updated.
     * 
     * @returns time locale string of when local storage was last updated.
     */
    static getUpdateTime() {
        return window.localStorage.getItem(StorageService.UPDATED) || null;
    }

    /**
     * 
     * @returns 
     */
    static id() {
        const notes = this.getAllNotes();
        const noteIds = notes.map(note => parseInt(note.id) || 0);
        const maxId = (noteIds.length !== 0)
            ? Math.max(...noteIds)
            : 0;

        console.log(maxId);

        return maxId + 1;
    }
}
