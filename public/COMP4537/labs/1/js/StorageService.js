import Note from './Note.js'

export default class StorageService {
    static id () {
        return window.localStorage.length;
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
