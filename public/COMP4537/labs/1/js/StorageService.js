import Note from './Note.js'

export default class StorageService {
    static id () {
        const keys = Object.keys(window.localStorage);

        if (keys.length === 0) {
            return 1;
        }

        let highestKey = Math.max(...keys.map(key => parseInt(key) || 0));

        return highestKey + 1;
    }

    static getAllNotes() {
        const notes = [];

        for (let i = 0; i < window.localStorage.length; i++) {
            const noteKey = window.localStorage.key(i);
            const noteString = window.localStorage.getItem(noteKey);
            const retrievedNote = new Note(noteKey, noteString);

            notes.push(retrievedNote);
        }

        return notes;
    }

    static removeNote(noteId) {
        window.localStorage.removeItem(noteId);
    }

    static addNote(noteId, noteString) {
        window.localStorage.setItem(noteId, noteString);
    }
}
