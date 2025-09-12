import Note from './Note.js'

export default class StorageService {
    static id () {
        const keys = Object.keys(window.localStorage);

        if (keys.length === 0) {
            return 1;
        }

        const parsedKeys = keys.map(e => parseInt(e) || 0);
        const maxKey = Math.max(...parsedKeys);

        return maxKey + 1;
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

    static removeNote(note) {
        window.localStorage.removeItem(note.id);
    }

    static addNote(note) {
        window.localStorage.setItem(note.id, note.content);
    }
}
